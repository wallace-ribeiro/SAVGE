var express = require('express');
const uuidv4 = require('uuid/v4');
var app = express();
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded());

var logged = {};

let hospitalNextId = 1;
let delegaciaNextId = 1;
let pontoTuristicoNextId = 1;
let praiaNextId = 1;
let ondeComerNextId = 1;
let ondeDormirNextId = 1;
let eventoNextId = 1;
let banheiroNextId = 1;

var hospitais = [];

var delegacias = [];
var pontos_turisticos = [];
var praias = [];
var onde_comer = [];
var onde_dormir = [];
var eventos = [];
var banheiros = [];

var users = {
  ceo: {username: 'ceo',password: '123456',admin: true},
  usuario01: {username: 'usuario01',password: '123',admin: false},
  usuario02: {username: 'usuario02',password: '123',admin: false},
  usuario03: {username: 'usuario03',password: '123',admin: false},
  usuario04: {username: 'usuario04',password: '123',admin: false},
  usuario05: {username: 'usuario05',password: '123',admin: false},
  usuario06: {username: 'usuario06',password: '123',admin: false},
  usuario07: {username: 'usuario07',password: '123',admin: false},
  usuario08: {username: 'usuario08',password: '123',admin: false},
  usuario09: {username: 'usuario09',password: '123',admin: false},
  usuario10: {username: 'usuario10',password: '123',admin: false},
  usuario11: {username: 'usuario11',password: '123',admin: false},
  usuario12: {username: 'usuario12',password: '123',admin: false},
  usuario13: {username: 'usuario13',password: '123',admin: false},
  usuario14: {username: 'usuario14',password: '123',admin: false},
  usuario15: {username: 'usuario15',password: '123',admin: false},
  usuario16: {username: 'usuario16',password: '123',admin: false},
  usuario17: {username: 'usuario17',password: '123',admin: false},
  usuario18: {username: 'usuario18',password: '123',admin: false},
  usuario19: {username: 'usuario19',password: '123',admin: false},
  usuario20: {username: 'usuario20',password: '123',admin: false},
  usuario21: {username: 'usuario21',password: '123',admin: false},
  'marcel.filho': {username: 'marcel.filho',password: '123',admin: false},
  'thiago.guedes': {username: 'thiago.guedes',password: '123',admin: false},
  'rodrigo.guedes': {username: 'rodrigo.guedes',password: '123',admin: false},
  'davi.mesquita': {username: 'davi.mesquita',password: '123',admin: false},
  'joao.ocardoso': {username: 'paulo.ssilva',password: '123',admin: false},
  'ana.espois': {username: 'ana.espois',password: '123',admin: false},
  'gustavo.carmo': {username: 'gustavo.carmo',password: '123',admin: false},
  'maycon.souza': {username: 'maycon.souza',password: '123',admin: false},
  'marcio.figueiredo': {username: 'marcio.figueiredo',password: '123',admin: false},
  'thiago.lotufo': {username: 'thiago.lotufo',password: '123',admin: false},
  'thiago.cpinheiro': {username: 'thiago.cpinheiro',password: '123',admin: false},
  'manoel.oliveira': {username: 'manoel.oliveira',password: '123',admin: false},
  'silvio.gazeta': {username: 'silvio.gazeta',password: '123',admin: false},
  'andre.carmo': {username: 'andre.carmo',password: '123',admin: false},
  'joao.leonardo': {username: 'joao.leonardo',password: '123',admin: false},
  'joao.leonardo': {username: 'joao.leonardo',password: '123',admin: false},
  'jose.cruz': {username: 'jose.cruz',password: '123',admin: false},
  'nicole.mesquita': {username: 'nicole.mesquita',password: '123',admin: false},
  'douglas.franco': {username: 'douglas.franco',password: '123',admin: false},
  'nixon.azeredo': {username: 'nixon.azeredo',password: '123',admin: false},
  'matheus.queiroz': {username: 'matheus.queiroz',password: '123',admin: false},
};

var tarefas = {};


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

app.post('/api/login', function(req, res) {
  if (req.body.login) {
      let user = users[req.body.login];
      console.log('user: ',user);
      console.log('body: ',req.body);
      if (user && user.password == req.body.senha) {
	const token = uuidv4();
	logged[token] = user;
	res.send(JSON.stringify({token: token}));
	console.log('created token: ',token);
	return;
      }
      
  }
  res.sendStatus(401)
  
});


//-------------------- HOSPITAIS
app.get('/api/hospitais', function(req, res) {
  console.log('req query: ',req.query);
  let aux = [];
  if(req.query.search) {
    let search = req.query.search
    aux = hospitais.filter((h) => (h.nome && h.nome.toUpperCase().includes(search.toUpperCase()))
      || (h.descricao && h.descricao.toUpperCase().includes(search.toUpperCase())) || (h.endereco && h.endereco.toUpperCase().includes(search.toUpperCase()))
    )
    
    
  } else {
    aux = hospitais
  }
  res.send(JSON.stringify(aux));
});


app.get('/api/hospitais/:id', function(req, res) {
  
  let token = req.headers.authorization;
  if (req.params.id) {
    let hospital = hospitais.find((n) => n.id == req.params.id);
    if(!hospital) {
      res.send(404);
      return;
    }
	
    res.send(hospital);
    return;
	
      
  }
  res.sendStatus(400);
});

app.post('/api/hospitais', function(req, res) {
  
  let token = req.headers.authorization;
  let user = logged[token];
  if(user) {
    let hospital = {id: hospitalNextId,
      autor: user.username,
      nome: req.body.nome,
      descricao: req.body.descricao,
      endereco: req.body.endereco,
      imagem: req.body.imagem,
    };
    hospitais.push(hospital);
    hospitalNextId++;
    res.send(hospital);
    return;
  }
  res.sendStatus(401);
});

app.put('/api/hospitais/:id', function(req, res) {
  
  let token = req.headers.authorization;
  let user = logged[token];
  if (req.params.id) {
      if(user) {
        let hospital = hospitais.find((n) => n.id == req.params.id);
	if(!hospital) {
	  res.send(404);
	  return;
	}
	if(user.admin || user.username == hospital.autor) {
	    hospital.nome = req.body.nome;
            hospital.descricao = req.body.descricao;
	    hospital.endereco = req.body.endereco;
	    hospital.imagem = req.body.imagem;
            res.send(hospital);
            return;
	}
      }
      res.sendStatus(401);
      return;
  }
  res.sendStatus(400);
});

app.delete('/api/hospitais/:id', function(req, res) {
  
  let token = req.headers.authorization;
  let user = logged[token];
  if (req.params.id) {
      if(user) {
        let hospital = hospitais.find((n) => n.id == req.params.id);
	let index = hospitais.findIndex((n) => n.id == req.params.id);
	if(!hospital) {
	  res.send(404);
	  return;
	}
	if(user.admin || user.username == hospital.autor) {
	    hospitais.splice(index, 1);
            res.send(hospital);
            return;
	}
      }
      res.sendStatus(401);
      return;
  }
  res.sendStatus(400);
});

//------------------- DELEGACIA

app.get('/api/delegacias', function(req, res) {
  console.log('req query: ',req.query);
  let aux = [];
  if(req.query.search) {
    let search = req.query.search
    aux = delegacias.filter((h) => (h.nome && h.nome.toUpperCase().includes(search.toUpperCase()))
      || (h.descricao && h.descricao.toUpperCase().includes(search.toUpperCase())) || (h.endereco && h.endereco.toUpperCase().includes(search.toUpperCase()))
    )
    
    
  } else {
    aux = delegacias
  }
  res.send(JSON.stringify(aux));
});


app.get('/api/delegacias/:id', function(req, res) {
  
  let token = req.headers.authorization;
  if (req.params.id) {
    let delegacia = delegacias.find((n) => n.id == req.params.id);
    if(!delegacia) {
      res.send(404);
      return;
    }
	
    res.send(delegacia);
    return;
	
      
  }
  res.sendStatus(400);
});

app.post('/api/delegacias', function(req, res) {
  
  let token = req.headers.authorization;
  let user = logged[token];
  if(user) {
    let delegacia = {id: delegaciaNextId,
      autor: user.username,
      nome: req.body.nome,
      descricao: req.body.descricao,
      endereco: req.body.endereco,
      imagem: req.body.imagem,
    };
    delegacias.push(delegacia);
    delegaciaNextId++;
    res.send(delegacia);
    return;
  }
  res.sendStatus(401);
});

app.put('/api/delegacias/:id', function(req, res) {
  
  let token = req.headers.authorization;
  let user = logged[token];
  if (req.params.id) {
      if(user) {
        let delegacia = delegacias.find((n) => n.id == req.params.id);
	if(!delegacia) {
	  res.send(404);
	  return;
	}
	if(user.admin || user.username == delegacia.autor) {
	    delegacia.nome = req.body.nome;
            delegacia.descricao = req.body.descricao;
	    delegacia.endereco = req.body.endereco;
	    delegacia.imagem = req.body.imagem;
            res.send(delegacia);
            return;
	}
      }
      res.sendStatus(401);
      return;
  }
  res.sendStatus(400);
});

app.delete('/api/delegacias/:id', function(req, res) {
  
  let token = req.headers.authorization;
  let user = logged[token];
  if (req.params.id) {
      if(user) {
        let delegacia = delegacias.find((n) => n.id == req.params.id);
	let index = delegacias.findIndex((n) => n.id == req.params.id);
	if(!delegacia) {
	  res.send(404);
	  return;
	}
	if(user.admin || user.username == delegacia.autor) {
	    delegacias.splice(index, 1);
            res.send(delegacia);
            return;
	}
      }
      res.sendStatus(401);
      return;
  }
  res.sendStatus(400);
});

//------------------------------------------------------

//------------------- PONTOS TURISTICOS

app.get('/api/pontos_turisticos', function(req, res) {
  console.log('req query: ',req.query);
  let aux = [];
  if(req.query.search) {
    let search = req.query.search
    aux = pontos_turisticos.filter((h) => (h.nome && h.nome.toUpperCase().includes(search.toUpperCase()))
      || (h.descricao && h.descricao.toUpperCase().includes(search.toUpperCase())) || (h.endereco && h.endereco.toUpperCase().includes(search.toUpperCase()))
    )
    
    
  } else {
    aux = pontos_turisticos
  }
  res.send(JSON.stringify(aux));
});


app.get('/api/pontos_turisticos/:id', function(req, res) {
  
  let token = req.headers.authorization;
  if (req.params.id) {
    let ponto_turistico = pontos_turisticos.find((n) => n.id == req.params.id);
    if(!ponto_turistico) {
      res.send(404);
      return;
    }
	
    res.send(ponto_turistico);
    return;
	
      
  }
  res.sendStatus(400);
});

app.post('/api/pontos_turisticos', function(req, res) {
  
  let token = req.headers.authorization;
  let user = logged[token];
  if(user) {
    let ponto_turistico = {id: pontoTuristicoNextId,
      autor: user.username,
      nome: req.body.nome,
      descricao: req.body.descricao,
      endereco: req.body.endereco,
      imagem: req.body.imagem,
    };
    pontos_turisticos.push(ponto_turistico);
    pontoTuristicoNextId++;
    res.send(ponto_turistico);
    return;
  }
  res.sendStatus(401);
});

app.put('/api/pontos_turisticos/:id', function(req, res) {
  
  let token = req.headers.authorization;
  let user = logged[token];
  if (req.params.id) {
      if(user) {
        let ponto_turistico = pontos_turisticos.find((n) => n.id == req.params.id);
	if(!ponto_turistico) {
	  res.send(404);
	  return;
	}
	if(user.admin || user.username == ponto_turistico.autor) {
	    ponto_turistico.nome = req.body.nome;
            ponto_turistico.descricao = req.body.descricao;
	    ponto_turistico.endereco = req.body.endereco;
	    ponto_turistico.imagem = req.body.imagem;
            res.send(ponto_turistico);
            return;
	}
      }
      res.sendStatus(401);
      return;
  }
  res.sendStatus(400);
});

app.delete('/api/pontos_turisticos/:id', function(req, res) {
  
  let token = req.headers.authorization;
  let user = logged[token];
  if (req.params.id) {
      if(user) {
        let ponto_turistico = pontos_turisticos.find((n) => n.id == req.params.id);
	let index = pontos_turisticos.findIndex((n) => n.id == req.params.id);
	if(!ponto_turistico) {
	  res.send(404);
	  return;
	}
	if(user.admin || user.username == ponto_turistico.autor) {
	    pontos_turisticos.splice(index, 1);
            res.send(ponto_turistico);
            return;
	}
      }
      res.sendStatus(401);
      return;
  }
  res.sendStatus(400);
});

//------------------------------------------------------

//------------------- PRAIAS

app.get('/api/praias', function(req, res) {
  console.log('req query: ',req.query);
  let aux = [];
  if(req.query.search) {
    let search = req.query.search
    aux = praias.filter((h) => (h.nome && h.nome.toUpperCase().includes(search.toUpperCase()))
      || (h.descricao && h.descricao.toUpperCase().includes(search.toUpperCase())) || (h.endereco && h.endereco.toUpperCase().includes(search.toUpperCase()))
    )
    
    
  } else {
    aux = praias
  }
  res.send(JSON.stringify(aux));
});


app.get('/api/praias/:id', function(req, res) {
  
  let token = req.headers.authorization;
  if (req.params.id) {
    let praia = praias.find((n) => n.id == req.params.id);
    if(!praia) {
      res.send(404);
      return;
    }
	
    res.send(praia);
    return;
	
      
  }
  res.sendStatus(400);
});

app.post('/api/praias', function(req, res) {
  
  let token = req.headers.authorization;
  let user = logged[token];
  if(user) {
    let praia = {id: praiaNextId,
      autor: user.username,
      nome: req.body.nome,
      descricao: req.body.descricao,
      endereco: req.body.endereco,
      imagem: req.body.imagem,
    };
    praias.push(praia);
    praiaNextId++;
    res.send(praia);
    return;
  }
  res.sendStatus(401);
});

app.put('/api/praias/:id', function(req, res) {
  
  let token = req.headers.authorization;
  let user = logged[token];
  if (req.params.id) {
      if(user) {
        let praia = praias.find((n) => n.id == req.params.id);
	if(!praia) {
	  res.send(404);
	  return;
	}
	if(user.admin || user.username == praia.autor) {
	    praia.nome = req.body.nome;
            praia.descricao = req.body.descricao;
	    praia.endereco = req.body.endereco;
	    praia.imagem = req.body.imagem;
            res.send(praia);
            return;
	}
      }
      res.sendStatus(401);
      return;
  }
  res.sendStatus(400);
});

app.delete('/api/praias/:id', function(req, res) {
  
  let token = req.headers.authorization;
  let user = logged[token];
  if (req.params.id) {
      if(user) {
        let praia = praias.find((n) => n.id == req.params.id);
	let index = praias.findIndex((n) => n.id == req.params.id);
	if(!praia) {
	  res.send(404);
	  return;
	}
	if(user.admin || user.username == praia.autor) {
	    praias.splice(index, 1);
            res.send(praia);
            return;
	}
      }
      res.sendStatus(401);
      return;
  }
  res.sendStatus(400);
});

//------------------------------------------------------

//------------------- ONDE COMER

app.get('/api/onde_comer', function(req, res) {
  console.log('req query: ',req.query);
  let aux = [];
  if(req.query.search) {
    let search = req.query.search
    aux = onde_comer.filter((h) => (h.nome && h.nome.toUpperCase().includes(search.toUpperCase()))
      || (h.descricao && h.descricao.toUpperCase().includes(search.toUpperCase())) || (h.endereco && h.endereco.toUpperCase().includes(search.toUpperCase()))
    )
    
    
  } else {
    aux = onde_comer
  }
  res.send(JSON.stringify(aux));
});


app.get('/api/onde_comer/:id', function(req, res) {
  
  let token = req.headers.authorization;
  if (req.params.id) {
    let aux = onde_comer.find((n) => n.id == req.params.id);
    if(!aux) {
      res.send(404);
      return;
    }
	
    res.send(aux);
    return;
	
      
  }
  res.sendStatus(400);
});

app.post('/api/onde_comer', function(req, res) {
  
  let token = req.headers.authorization;
  let user = logged[token];
  if(user) {
    let aux = {id: ondeComerNextId,
      autor: user.username,
      nome: req.body.nome,
      descricao: req.body.descricao,
      endereco: req.body.endereco,
      imagem: req.body.imagem,
    };
    onde_comer.push(aux);
    ondeComerNextId++;
    res.send(aux);
    return;
  }
  res.sendStatus(401);
});

app.put('/api/onde_comer/:id', function(req, res) {
  
  let token = req.headers.authorization;
  let user = logged[token];
  if (req.params.id) {
      if(user) {
        let aux = onde_comer.find((n) => n.id == req.params.id);
	if(!aux) {
	  res.send(404);
	  return;
	}
	if(user.admin || user.username == aux.autor) {
	    aux.nome = req.body.nome;
            aux.descricao = req.body.descricao;
	    aux.endereco = req.body.endereco;
	    aux.imagem = req.body.imagem;
            res.send(aux);
            return;
	}
      }
      res.sendStatus(401);
      return;
  }
  res.sendStatus(400);
});

app.delete('/api/onde_comer/:id', function(req, res) {
  
  let token = req.headers.authorization;
  let user = logged[token];
  if (req.params.id) {
      if(user) {
        let aux = onde_comer.find((n) => n.id == req.params.id);
	let index = onde_comer.findIndex((n) => n.id == req.params.id);
	if(!aux) {
	  res.send(404);
	  return;
	}
	if(user.admin || user.username == aux.autor) {
	    onde_comer.splice(index, 1);
            res.send(aux);
            return;
	}
      }
      res.sendStatus(401);
      return;
  }
  res.sendStatus(400);
});

//------------------------------------------------------

//------------------- ONDE DORMIR

app.get('/api/onde_dormir', function(req, res) {
  console.log('req query: ',req.query);
  let aux = [];
  if(req.query.search) {
    let search = req.query.search
    aux = onde_dormir.filter((h) => (h.nome && h.nome.toUpperCase().includes(search.toUpperCase()))
      || (h.descricao && h.descricao.toUpperCase().includes(search.toUpperCase())) || (h.endereco && h.endereco.toUpperCase().includes(search.toUpperCase()))
    )
    
    
  } else {
    aux = onde_dormir
  }
  res.send(JSON.stringify(aux));
});


app.get('/api/onde_dormir/:id', function(req, res) {
  
  let token = req.headers.authorization;
  if (req.params.id) {
    let aux = onde_dormir.find((n) => n.id == req.params.id);
    if(!aux) {
      res.send(404);
      return;
    }
	
    res.send(aux);
    return;
	
      
  }
  res.sendStatus(400);
});

app.post('/api/onde_dormir', function(req, res) {
  
  let token = req.headers.authorization;
  let user = logged[token];
  if(user) {
    let aux = {id: ondeDormirNextId,
      autor: user.username,
      nome: req.body.nome,
      descricao: req.body.descricao,
      endereco: req.body.endereco,
      imagem: req.body.imagem,
    };
    onde_dormir.push(aux);
    ondeDormirNextId++;
    res.send(aux);
    return;
  }
  res.sendStatus(401);
});

app.put('/api/onde_dormir/:id', function(req, res) {
  
  let token = req.headers.authorization;
  let user = logged[token];
  if (req.params.id) {
      if(user) {
        let aux = onde_dormir.find((n) => n.id == req.params.id);
	if(!aux) {
	  res.send(404);
	  return;
	}
	if(user.admin || user.username == aux.autor) {
	    aux.nome = req.body.nome;
            aux.descricao = req.body.descricao;
	    aux.endereco = req.body.endereco;
	    aux.imagem = req.body.imagem;
            res.send(aux);
            return;
	}
      }
      res.sendStatus(401);
      return;
  }
  res.sendStatus(400);
});

app.delete('/api/onde_dormir/:id', function(req, res) {
  
  let token = req.headers.authorization;
  let user = logged[token];
  if (req.params.id) {
      if(user) {
        let aux = onde_dormir.find((n) => n.id == req.params.id);
	let index = onde_dormir.findIndex((n) => n.id == req.params.id);
	if(!aux) {
	  res.send(404);
	  return;
	}
	if(user.admin || user.username == aux.autor) {
	    onde_dormir.splice(index, 1);
            res.send(aux);
            return;
	}
      }
      res.sendStatus(401);
      return;
  }
  res.sendStatus(400);
});

//------------------------------------------------------



//------------------- EVENTOS

app.get('/api/eventos', function(req, res) {
  console.log('req query: ',req.query);
  let aux = [];
  if(req.query.search) {
    let search = req.query.search
    aux = eventos.filter((h) => (h.nome && h.nome.toUpperCase().includes(search.toUpperCase()))
      || (h.descricao && h.descricao.toUpperCase().includes(search.toUpperCase())) || (h.endereco && h.endereco.toUpperCase().includes(search.toUpperCase()))
    )
    
    
  } else {
    aux = eventos
  }
  res.send(JSON.stringify(aux));
});


app.get('/api/eventos/:id', function(req, res) {
  
  let token = req.headers.authorization;
  if (req.params.id) {
    let aux = eventos.find((n) => n.id == req.params.id);
    if(!aux) {
      res.send(404);
      return;
    }
	
    res.send(aux);
    return;
	
      
  }
  res.sendStatus(400);
});

app.post('/api/eventos', function(req, res) {
  
  let token = req.headers.authorization;
  let user = logged[token];
  if(user) {
    let aux = {id: eventoNextId,
      autor: user.username,
      nome: req.body.nome,
      descricao: req.body.descricao,
      endereco: req.body.endereco,
      imagem: req.body.imagem,
      dataHora: req.body.dataHora,
    };
    eventos.push(aux);
    eventoNextId++;
    res.send(aux);
    return;
  }
  res.sendStatus(401);
});

app.put('/api/eventos/:id', function(req, res) {
  
  let token = req.headers.authorization;
  let user = logged[token];
  if (req.params.id) {
      if(user) {
        let aux = eventos.find((n) => n.id == req.params.id);
	if(!aux) {
	  res.send(404);
	  return;
	}
	if(user.admin || user.username == aux.autor) {
	    aux.nome = req.body.nome;
            aux.descricao = req.body.descricao;
	    aux.endereco = req.body.endereco;
	    aux.imagem = req.body.imagem;
	    aux.dataHora = req.body.dataHora;
            res.send(aux);
            return;
	}
      }
      res.sendStatus(401);
      return;
  }
  res.sendStatus(400);
});

app.delete('/api/eventos/:id', function(req, res) {
  
  let token = req.headers.authorization;
  let user = logged[token];
  if (req.params.id) {
      if(user) {
        let aux = eventos.find((n) => n.id == req.params.id);
	let index = eventos.findIndex((n) => n.id == req.params.id);
	if(!aux) {
	  res.send(404);
	  return;
	}
	if(user.admin || user.username == aux.autor) {
	    eventos.splice(index, 1);
            res.send(aux);
            return;
	}
      }
      res.sendStatus(401);
      return;
  }
  res.sendStatus(400);
});

//------------------------------------------------------

//------------------- BANHEIROS

app.get('/api/banheiros', function(req, res) {
  console.log('req query: ',req.query);
  let aux = [];
  if(req.query.search) {
    let search = req.query.search
    aux = banheiros.filter((h) => (h.nome && h.nome.toUpperCase().includes(search.toUpperCase()))
      || (h.descricao && h.descricao.toUpperCase().includes(search.toUpperCase())) || (h.endereco && h.endereco.toUpperCase().includes(search.toUpperCase()))
    )
    
    
  } else {
    aux = banheiros
  }
  res.send(JSON.stringify(aux));
});


app.get('/api/banheiros/:id', function(req, res) {
  
  let token = req.headers.authorization;
  if (req.params.id) {
    let aux = banheiros.find((n) => n.id == req.params.id);
    if(!aux) {
      res.send(404);
      return;
    }
	
    res.send(aux);
    return;
	
      
  }
  res.sendStatus(400);
});

app.post('/api/banheiros', function(req, res) {
  
  let token = req.headers.authorization;
  let user = logged[token];
  if(user) {
    let aux = {id: banheiroNextId,
      autor: user.username,
      nome: req.body.nome,
      descricao: req.body.descricao,
      endereco: req.body.endereco,
      imagem: req.body.imagem,
    };
    banheiros.push(aux);
    banheiroNextId++;
    res.send(aux);
    return;
  }
  res.sendStatus(401);
});

app.put('/api/banheiros/:id', function(req, res) {
  
  let token = req.headers.authorization;
  let user = logged[token];
  if (req.params.id) {
      if(user) {
        let aux = banheiros.find((n) => n.id == req.params.id);
	if(!aux) {
	  res.send(404);
	  return;
	}
	if(user.admin || user.username == aux.autor) {
	    aux.nome = req.body.nome;
            aux.descricao = req.body.descricao;
	    aux.endereco = req.body.endereco;
	    aux.imagem = req.body.imagem;
            res.send(aux);
            return;
	}
      }
      res.sendStatus(401);
      return;
  }
  res.sendStatus(400);
});

app.delete('/api/banheiros/:id', function(req, res) {
  
  let token = req.headers.authorization;
  let user = logged[token];
  if (req.params.id) {
      if(user) {
        let aux = banheiros.find((n) => n.id == req.params.id);
	let index = banheiros.findIndex((n) => n.id == req.params.id);
	if(!aux) {
	  res.send(404);
	  return;
	}
	if(user.admin || user.username == aux.autor) {
	    banheiros.splice(index, 1);
            res.send(aux);
            return;
	}
      }
      res.sendStatus(401);
      return;
  }
  res.sendStatus(400);
});

//------------------------------------------------------





app.post('/api/logout', function(req, res) {
  if (req.body.login) {
      let keys = Object.keys(logged);
      keys.forEach((key) => {
	if(logged[key] && logged[key].username == req.body.login) {
	  logged[key] = null;
	}
      });
      res.send('OK');
      return;
  }
  res.sendStatus(401)

});

app.get('/api/allLoggedUsers', function(req, res) {
  res.send(JSON.stringify(logged));
});

app.listen(3019, function () {
  console.log('Example app listening on port 3019!');
});