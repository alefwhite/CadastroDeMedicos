use clinica;

-- Tabela tipo_usuario
INSERT INTO tipo_usuario(nome) VALUES('Administrador'),('Normal');


-- Tabela usuario
INSERT INTO usuario(email, senha, id_tipoUsuario) VALUES('admin@admin.com', '123', 1);

SELECT * FROM usuario;


-- Tabela especialidade
INSERT INTO especialidade(nome) 
VALUES('Alergologia'),('Angiologia'),('Buco Maxilo'),('Carddiologia Clínica'),('Cardiologia'),('Cirurgia Geral');

SELECT * FROM especialidade;


-- Tabela cad_medico
INSERT INTO cad_medico(nome, crm, telefone, estado, cidade) VALUES('João Pedro Silva', '1b2b3c4d', '11977658890', 'SP', 'SP');

SELECT * FROM cad_medico;


-- Tabela medico_especialidade
INSERT INTO medico_especialidade(id_medico, id_especialidade) VALUES(1,1),(1,2);

SELECT * FROM medico_especialidade;




SELECT E.nome FROM medico_especialidade AS M 
INNER JOIN cad_medico AS C ON C.id_medico = M.id_medico 
INNER JOIN especialidade AS E ON E.id_especialidade = M.id_especialidade 
WHERE M.id_medico = 1;


