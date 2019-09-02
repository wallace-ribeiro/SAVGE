var express = require('express');
const uuidv4 = require('uuid/v4');
var app = express();
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded());
//var sqlite3 = require('sqlite3').verbose();

var sqlite = require('sqlite-sync');
sqlite.connect('db/database.db');




var logged = {};




//var db = new sqlite3.Database('./db/database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
//  if (err) {
//    console.error(err.message);
//  }
  
//  console.log('Connected to the database.');
//});



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


function get(req, res, tableName) {
  console.log('req query: ',req.query);
  let aux = [];
  let objects = sqlite.run("SELECT * FROM "+tableName);
  console.log('objects: ',objects);
  if(req.query.search) {
    let search = req.query.search
    aux = objects.filter((h) => (h.nome && h.nome.toUpperCase().includes(search.toUpperCase()))
      || (h.descricao && h.descricao.toUpperCase().includes(search.toUpperCase())) || (h.endereco && h.endereco.toUpperCase().includes(search.toUpperCase()))
    )
    
    
  } else {
    aux = objects
  }
  res.send(JSON.stringify(aux));
  
}

function getById(req, res, tableName) {
  let token = req.headers.authorization;
  if (req.params.id) {
    let object = sqlite.run("SELECT * FROM "+tableName+" where id="+req.params.id);
    object = object.length > 0 ? object[0] : null
    if(!object) {
      res.send(404);
      return;
    }
	
    res.send(object);
    return;
	
      
  }
  res.sendStatus(400);
}

function insert(req, res, tableName) {
  let token = req.headers.authorization;
  let user = logged[token];
  if(user) {
    
    let object = {
      autor: user.username,
      nome: req.body.nome,
      descricao: req.body.descricao,
      endereco: req.body.endereco,
      imagem: req.body.imagem,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    };
    
    let id = sqlite.insert(tableName, object);
    object.id = id;
    console.log('new id: ',id)
    res.send(object);
    return;
  }
  res.sendStatus(401);
}

function update(req, res, tableName) {
  let token = req.headers.authorization;
  let user = logged[token];
  console.log('user: ',user);
  if (req.params.id) {
      if(user) {
        let object = sqlite.run("SELECT * FROM "+tableName+" where id="+req.params.id);
        object = object.length > 0 ? object[0] : null
	if(!object) {
	  res.send(404);
	  return;
	}
	if(user.admin || user.username == object.autor) {
	    updateObject = {}
	    updateObject.nome = req.body.nome;
            updateObject.descricao = req.body.descricao;
	    updateObject.endereco = req.body.endereco;
	    updateObject.imagem = req.body.imagem;
	    updateObject.latitude = req.body.latitude;
	    updateObject.longitude = req.body.longitude;
	    
	    
	    object.nome = req.body.nome;
            object.descricao = req.body.descricao;
	    object.endereco = req.body.endereco;
	    object.imagem = req.body.imagem;
	    object.latitude = req.body.latitude;
	    object.longitude = req.body.longitude;
	    
	    sqlite.update(tableName, updateObject, {id: req.params.id});
            res.send(object);
            return;
	}
      }
      res.sendStatus(401);
      return;
  }
  res.sendStatus(400);
}

function remove(req, res, tableName) {
  let token = req.headers.authorization;
  let user = logged[token];
  if (req.params.id) {
      if(user) {
        let object = getFromTableById(tableName, req.params.id);
	if(!object) {
	  res.send(404);
	  return;
	}
	if(user.admin || user.username == object.autor) {
	    sqlite.delete(tableName, {id: req.params.id});
	    
            res.send(object);
            return;
	}
      }
      res.sendStatus(401);
      return;
  }
  res.sendStatus(400);
}

function updateObject(object, params) {
  object.nome = params.nome;
  object.descricao = params.descricao
  object.endereco = params.endereco;
  object.imagem = params.imagem;
  object.latitude = params.latitude;
  object.longitude = params.longitude;
}

function getFromTableById(table, id) {
  let object = sqlite.run("SELECT * FROM "+table+" where id="+id);
  object = object.length > 0 ? object[0] : null;
  return object;
}

//-------------------- HOSPITAIS
app.get('/api/hospitais', function(req, res) {
  get(req, res, "hospitais")
});


app.get('/api/hospitais/:id', function(req, res) {
  
  getById(req, res, "hospitais")
});

app.post('/api/hospitais', function(req, res) {
  
  insert(req, res, "hospitais")
});


app.put('/api/hospitais/:id', function(req, res) {
  
  update(req, res, "hospitais")
});

app.delete('/api/hospitais/:id', function(req, res) {
  
  remove(req, res, "hospitais")
});

//------------------- DELEGACIA

app.get('/api/delegacias', function(req, res) {
  get(req, res, "delegacias")
});


app.get('/api/delegacias/:id', function(req, res) {
  
  getById(req, res, "delegacias")
});

app.post('/api/delegacias', function(req, res) {
  
  insert(req, res, "delegacias")
});

app.put('/api/delegacias/:id', function(req, res) {
  
  update(req, res, "delegacias")
});

app.delete('/api/delegacias/:id', function(req, res) {
  
  remove(req, res, "delegacias")
});

//------------------------------------------------------

//------------------- PONTOS TURISTICOS

app.get('/api/pontos_turisticos', function(req, res) {
  get(req, res, "pontos_turisticos")
});


app.get('/api/pontos_turisticos/:id', function(req, res) {
  
  getById(req, res, "pontos_turisticos")
});

app.post('/api/pontos_turisticos', function(req, res) {
  
  insert(req, res, "pontos_turisticos")
});

app.put('/api/pontos_turisticos/:id', function(req, res) {
  
  update(req, res, "pontos_turisticos")
});

app.delete('/api/pontos_turisticos/:id', function(req, res) {
  
  remove(req, res, "pontos_turisticos")
});

//------------------------------------------------------

//------------------- PRAIAS

app.get('/api/praias', function(req, res) {
  get(req, res, "praias")
});


app.get('/api/praias/:id', function(req, res) {
  
  getById(req, res, "praias")
});

app.post('/api/praias', function(req, res) {
  
  insert(req, res, "praias")
});

app.put('/api/praias/:id', function(req, res) {
  
  update(req, res, "praias")
});

app.delete('/api/praias/:id', function(req, res) {
  
  remove(req, res, "praias")
});

//------------------------------------------------------

//------------------- ONDE COMER

app.get('/api/onde_comer', function(req, res) {
  get(req, res, "onde_comer")
});


app.get('/api/onde_comer/:id', function(req, res) {
  
  getById(req, res, "onde_comer")
});

app.post('/api/onde_comer', function(req, res) {
  
  insert(req, res, "onde_comer")
});

app.put('/api/onde_comer/:id', function(req, res) {
  
  update(req, res, "onde_comer")
});

app.delete('/api/onde_comer/:id', function(req, res) {
  
  remove(req, res, "onde_comer")
});

//------------------------------------------------------

//------------------- ONDE DORMIR

app.get('/api/onde_dormir', function(req, res) {
  get(req, res, "onde_dormir")
});


app.get('/api/onde_dormir/:id', function(req, res) {
  
  getById(req, res, "onde_dormir")
});

app.post('/api/onde_dormir', function(req, res) {
  
  insert(req, res, "onde_dormir")
});

app.put('/api/onde_dormir/:id', function(req, res) {
  
  update(req, res, "onde_dormir")
});

app.delete('/api/onde_dormir/:id', function(req, res) {
  
  remove(req, res, "onde_dormir")
});

//------------------------------------------------------



//------------------- EVENTOS

app.get('/api/eventos', function(req, res) {
  get(req, res, "eventos")
});


app.get('/api/eventos/:id', function(req, res) {
  
  getById(req, res, "eventos")
});


app.delete('/api/eventos/:id', function(req, res) {
  
  remove(req, res, "eventos")
});


app.post('/api/eventos', function(req, res) {
  let token = req.headers.authorization;
  let user = logged[token];
  if(user) {
    
    let object = {
      autor: user.username,
      nome: req.body.nome,
      descricao: req.body.descricao,
      endereco: req.body.endereco,
      imagem: req.body.imagem,
      data_hora: req.body.data_hora,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    };
    
    let id = sqlite.insert("eventos", object);
    object.id = id;
    console.log('new id: ',id)
    res.send(object);
    return;
  }
  res.sendStatus(401);
  
});

app.put('/api/eventos/:id', function(req, res) {
  let token = req.headers.authorization;
  let user = logged[token];
  console.log('user: ',user);
  if (req.params.id) {
      if(user) {
        let object = sqlite.run("SELECT * FROM "+tableName+" where id="+req.params.id);
        object = object.length > 0 ? object[0] : null
	if(!object) {
	  res.send(404);
	  return;
	}
	if(user.admin || user.username == object.autor) {
	    updateObject = {}
	    updateObject.nome = req.body.nome;
            updateObject.descricao = req.body.descricao;
	    updateObject.endereco = req.body.endereco;
	    updateObject.imagem = req.body.imagem;
	    updateObject.data_hora = req.body.data_hora;
	    updateObject.latitude = req.body.latitude;
	    updateObject.longitude = req.body.longitude;
	    
	    
	    object.nome = req.body.nome;
            object.descricao = req.body.descricao;
	    object.endereco = req.body.endereco;
	    object.imagem = req.body.imagem;
	    object.data_hora = req.body.data_hora;
	    object.latitude = req.body.latitude;
	    object.longitude = req.body.longitude;
	    
	    sqlite.update(tableName, updateObject, {id: req.params.id});
            res.send(object);
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
  get(req, res, "banheiros")
});


app.get('/api/banheiros/:id', function(req, res) {
  
  getById(req, res, "banheiros")
});

app.post('/api/banheiros', function(req, res) {
  
  insert(req, res, "banheiros")
});

app.put('/api/banheiros/:id', function(req, res) {
  
  update(req, res, "banheiros")
});

app.delete('/api/banheiros/:id', function(req, res) {
  
  remove(req, res, "banheiros")
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