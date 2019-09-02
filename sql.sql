CREATE TABLE hospitais (
id INTEGER PRIMARY KEY AUTOINCREMENT ,
autor TEXT,
nome TEXT,
descricao TEXT,
endereco TEXT,
imagem TEXT,
latitude TEXT,
longitude TEXT
);

CREATE TABLE delegacias (
id INTEGER PRIMARY KEY AUTOINCREMENT ,
autor TEXT,
nome TEXT,
descricao TEXT,
endereco TEXT,
imagem TEXT,
latitude TEXT,
longitude TEXT
);

CREATE TABLE pontos_turisticos (
id INTEGER PRIMARY KEY AUTOINCREMENT ,
autor TEXT,
nome TEXT,
descricao TEXT,
endereco TEXT,
imagem TEXT,
latitude TEXT,
longitude TEXT
);

CREATE TABLE praias (
id INTEGER PRIMARY KEY AUTOINCREMENT ,
autor TEXT,
nome TEXT,
descricao TEXT,
endereco TEXT,
imagem TEXT,
latitude TEXT,
longitude TEXT
);

CREATE TABLE onde_comer (
id INTEGER PRIMARY KEY AUTOINCREMENT ,
autor TEXT,
nome TEXT,
descricao TEXT,
endereco TEXT,
imagem TEXT,
latitude TEXT,
longitude TEXT
);

CREATE TABLE onde_dormir (
id INTEGER PRIMARY KEY AUTOINCREMENT ,
autor TEXT,
nome TEXT,
descricao TEXT,
endereco TEXT,
imagem TEXT,
latitude TEXT,
longitude TEXT
);


CREATE TABLE eventos (
id INTEGER PRIMARY KEY AUTOINCREMENT ,
autor TEXT,
nome TEXT,
descricao TEXT,
endereco TEXT,
imagem TEXT,
data_hora TEXT,
latitude TEXT,
longitude TEXT
);

CREATE TABLE banheiros (
id INTEGER PRIMARY KEY AUTOINCREMENT ,
autor TEXT,
nome TEXT,
descricao TEXT,
endereco TEXT,
imagem TEXT,
latitude TEXT,
longitude TEXT
);
