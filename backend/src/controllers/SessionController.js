const jwt = require('jsonwebtoken');
const mysql = require('../config/database');
const authConfig = require('../config/auth');

class SessionController {
  async store(req, res) {
    
    const { email, senha } = req.body;  
    
    mysql.getConnection((error, conn) => {
        if(error) { return console.error(error); }

        conn.query(
          "SELECT * FROM usuario WHERE email = ? and senha = ?; ",
          [email, senha],
          (error, result, fields) => {
            conn.release();
            
            if(error) { return res.status(500).json({ error })}
            
            if(result.length == 0) { return res.status(404).json({ message: "Usuário ou senha incorretos."}) }
            
            return res.json({
              usuario: {
                id_usuario: result[0].id_usuario,                
                email: result[0].email,
                id_tipoUsuario: result[0].id_tipoUsuario
              },
              token: jwt.sign({ id: result[0].id_usuario, tipo_usuario: result[0].id_tipoUsuario }, authConfig.secret, { 
                expiresIn: authConfig.expiresIn,
              }),
        
            });
          }
        )

    });
    
  }
}

module.exports = new SessionController();