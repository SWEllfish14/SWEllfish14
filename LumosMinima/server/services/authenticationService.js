const db = require("../models/index");
Amministratori = db.amministratori
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const tokenSecret="mysecretsshhh"


const login = async(username,password) => {
    try {
        console.log(username)
        const amministratore = await Amministratori.findOne({
            where: {
              nome_utente: username
            }
          })
          if(!amministratore){
            return("Nome utente o password invalidi 1")
          }
          console.log(amministratore)
        const match =     await bcrypt.compare(password,amministratore.password)
        if (!match) {
            return("Nome utente o password invalidi 2")
          }
          const token = jwt.encode({
            username: username,
            expire:"1h"
           },"abracadabra");
           return token;
        }
          
    catch (error) {
        console.log(error)
        return ("errore")
    }
    
}

// const login = async (username, password, callback) => {
//     users.get(username, (err, user) => {
//       if (err) return callback(err);
      
//       bcrypt.compare(password, user.hash, (err, res) => {
//         if (err) return callback(err);
//         if (!res) return callback(new Error('Invalid password'));
        
//         const token = jwt.encode({
//           username: username,
//           expire: Date.now() + (1000 * 60 * 60) //1 hour
//         }, tokenSecret);
        
//         callback(null, token);
//       });
//     });
//   };
module.exports = {
    login
}