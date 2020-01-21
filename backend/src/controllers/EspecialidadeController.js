const mysql = require('../config/database');

class EspecialidadeController {  

  get(req, res) {
    mysql.getConnection((error, conn) => {
      if(error) { return console.error(error); }

      conn.query(
        'SELECT * FROM especialidade',
        (error, result, fields) => {
          conn.release();
            
          if(error) { return res.status(500).json({ error })}

          return res.status(200).json({ especialidades: result });
        }
      )

    });
  }

 
}

module.exports = new EspecialidadeController();