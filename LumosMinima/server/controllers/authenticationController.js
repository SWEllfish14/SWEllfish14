authenticationService = require("../services/authenticationService")


const login =  async  (req, res) => {
    try{
        data = req.body

        const autenticato = await authenticationService.login(data.variables.username,data.variables.password);
        if(autenticato === "Nome utente o password invalidi")
            res.status(400).json({ msg: 'Invalid Email Or Password' });
        else{
            res.status(200).send({ok: true, token: autenticato});
        }
        
      }catch(error) {
        res.status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } })
      }
    
}
module.exports = {
    login
}

// authenticationService.login(req.body.username, req.body.password,
//     (err, result) => {
//       if (err) {
//         return res.status(401).send({
//           ok: false,
//           error: 'Invalid username/password'
//         });
//       }
//       res.status(200).send({ok: true, token: result});
//     }
//   );
// };