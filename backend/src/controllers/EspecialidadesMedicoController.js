const mysql = require('../config/database');

class EspecialidadesMedicoController {

  store(req, res) {

    if(req.tipoUsuario !== 1) {
      return res.status(401).json( {message: "Apenas usuários administradores podem cadastrar."})
    }

    const {  id_medico, id_especialidade } = req.body;  


    mysql.getConnection((error, conn) => {
        if(error) { return console.error(error); }
    
        conn.query(
          'INSERT INTO medico_especialidade(id_medico, id_especialidade) VALUES(?,?);',
          [id_medico, id_especialidade],
          (error, result, fields) => {
            conn.release();
            
            if(error) { return res.status(500).json({ error })}
    
            return res.status(200).json({ 
              message: "Especialidade adicionada com sucesso."             
            });
          }
        )
    
    });
  }

  get(req, res) {
    const id = req.params.id;

    mysql.getConnection((error, conn) => {
        if(error) { return console.error(error); }

        conn.query(
          "SELECT E.nome FROM medico_especialidade AS M INNER JOIN cad_medico AS C ON C.id_medico = M.id_medico INNER JOIN especialidade AS E ON E.id_especialidade = M.id_especialidade WHERE M.id_medico = ? ",
          [id],
          (error, result, fields) => {
            conn.release();
            
            if(error) { return res.status(500).json({ error })}

            return res.status(200).json({ especialidades: result });
          }
        )

    });
  }

}

module.exports = new EspecialidadesMedicoController();