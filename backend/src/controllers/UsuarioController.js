const mysql = require('../config/database');

class UsuarioController {

  async store(req, res) {

    if(req.tipoUsuario !== 1) {
      return res.status(401).json( {message: "Usuário não autorizado."})
    }

    const { email, senha, id_tipoUsuario } = req.body;  


    mysql.getConnection((error, conn) => {
        if(error) { return console.error(error); }
    
        conn.query(
          'INSERT INTO usuario(email, senha, id_tipoUsuario) VALUES(?, ?, ?)',
          [email, senha, id_tipoUsuario],
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

}

module.exports = new UsuarioController();