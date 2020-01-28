CREATE DATABASE clinica;
 
USE clinica;

CREATE TABLE especialidade (
	id_especialidade INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL
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

CREATE TABLE usuario (
	id_usuario INT PRIMARY KEY AUTO_INCREMENT,
	email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    id_tipoUsuario INT NOT NULL,
    FOREIGN KEY(id_tipoUsuario) REFERENCES tipo_usuario(id_tipoUsuario)
);

CREATE TABLE medico_especialidade (
	id_medicoEspecialidade INT PRIMARY KEY AUTO_INCREMENT,
    id_medico INT NOT NULL,
    id_especialidade INT NOT NULL,
	FOREIGN KEY(id_medico) REFERENCES cad_medico(id_medico),
    FOREIGN KEY(id_especialidade) REFERENCES especialidade(id_especialidade)
);


