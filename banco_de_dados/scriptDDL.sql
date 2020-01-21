CREATE DATABASE clinica;
 
USE clinica;

CREATE TABLE especialidade (
	id_especialidade INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL
);


CREATE TABLE usuario (
	id_usuario INT PRIMARY KEY AUTO_INCREMENT,
	email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    id_tipoUsuario INT NOT NULL,
    FOREIGN KEY(id_tipoUsuario) REFERENCES tipo_usuario(id_tipoUsuario)

);


CREATE TABLE tipo_usuario (
	id_tipoUsuario INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(255) NOT NULL
);


CREATE TABLE cad_medico (
	id_medico INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    crm VARCHAR(255) NOT NULL,
	telefone VARCHAR(11) NOT NULL,
    estado VARCHAR(255) NOT NULL,
    cidade VARCHAR(255) NOT NULL    
);

CREATE TABLE medico_especialidade (
	id_medicoEspecialidade INT PRIMARY KEY AUTO_INCREMENT,
    id_medico INT NOT NULL,
    id_especialidade INT NOT NULL,
	FOREIGN KEY(id_medico) REFERENCES cad_medico(id_medico),
    FOREIGN KEY(id_especialidade) REFERENCES especialidade(id_especialidade)
);

INSERT INTO tipo_usuario(nome) VALUES('Administrador');
INSERT INTO usuario(email, senha, id_tipoUsuario) VALUES('admin@admin.com', '123', 1);
INSERT INTO especialidade(nome) VALUES('Alergologia'),('Cardiologia');
INSERT INTO medico_especialidade(id_medico, id_especialidade) VALUES(1,2);


SELECT * FROM usuario;


SELECT E.nome FROM medico_especialidade AS M 
INNER JOIN cad_medico AS C ON C.id_medico = M.id_medico 
INNER JOIN especialidade AS E ON E.id_especialidade = M.id_especialidade 
WHERE M.id_medico = 1;


delete from medico_especialidade where id_medicoEspecialidade >= 3;
