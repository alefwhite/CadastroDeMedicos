const mysql = require('../config/database');

class MedicoController {

  store(req, res) {

    if(req.tipoUsuario !== 1) {
      return res.status(401).json( {message: "Apenas usuários administradores podem cadastrar."})
    }

    const { nome, crm, telefone, estado, cidade } = req.body;  


    mysql.getConnection((error, conn) => {
        if(error) { return console.error(error); }
    
        conn.query(
          'INSERT INTO cad_medico(nome, crm, telefone, estado, cidade) VALUES(?, ?, ?, ?, ?)',
          [nome, crm, telefone, estado, cidade],
          (error, result, fields) => {
            conn.release();

            if(error) { return res.status(500).json({ error })}
    
            return res.status(201).json({ 
              message: "Usuário cadastrado com sucesso.",
              id_usuario: result.insertId 
            });
          }
        )
    
    });
  }

  get(req, res) {
    mysql.getConnection((error, conn) => {
      if(error) { return console.error(error); }

      conn.query(
        'SELECT * FROM cad_medico',
        (error, result, fields) => {
          conn.release();
            
          if(error) { return res.status(500).json({ error })}

          return res.status(200).json({ medicos: result });
        }
      )

    });
  }

  delete(req, res) {
    const id = req.params.id;

    mysql.getConnection((error, conn) => {
      if(error) { return console.error(error); }

      conn.query(
        'DELETE FROM cad_medico WHERE id_medico = ?',
        [id],
        (error, result, fields) => {
          conn.release();
            
          if(error) { return res.status(500).json({ error })}

          return res.status(200).json({ message: 'Usuário deletado com sucesso.' });
        }
      )

    });
  }

  update(req, res) {
    const id = req.params.id;

    const {nome, crm, telefone, estado, cidade} = req.body;

    mysql.getConnection((error, conn) => {
      if(error) { return console.error(error); }

      conn.query(
        "update cad_medico set nome = ?, crm = ?, telefone = ?, estado = ?, cidade = ? where id_medico = ?",
        [nome, crm, telefone, estado, cidade, id],
        (error, result, fields) => {
          conn.release();
            
          if(error) { return res.status(500).json({ error })}

          return res.status(200).json({ message: 'Usuário alterado com sucesso.' });
        }
      )

    });
  }

}

module.exports = new MedicoController();