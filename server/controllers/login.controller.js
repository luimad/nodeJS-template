const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs'); //npm install bcryptjs --save
const jwt = require('jsonwebtoken'); //npm install jsonwebtoken --save

const SEED = require('../config/config').SEED;

const loginCtrl = {};

loginCtrl.login =  (req, res) => {
    var body = req.body;
    Usuario.findOne({email:body.email},(err, usuarioDB)=>{

      if(err){
         return res.status(400).json({
              ok: false,
              mensaje: 'Error al buscar usuarios',
              errors:err
          });
      }

      if(!usuarioDB){
          return res.status(400).json({
              ok: false,
              mensaje: 'Credenciales incorrectas - email',
              errors: err
          });
      }

      if(!bcrypt.compareSync(body.password, usuarioDB.password)){
          return res.status(400).json({
              ok:false,
              mensaje: 'Credenciales incorrectas - password',
              errors:err
          });

      }

          
      //crear token        meter un usuario   semilla para token unico          caducidad
        var token = jwt.sign({ usuario: usuarioDB }, SEED ,{expiresIn:86400}); // 24 horas

        res.status(201).json({
            ok: true,
            usuario:{
                id: usuarioDB._id,
                nombre:usuarioDB.nombre,
                apellidos:usuarioDB.apellidos,
                email: usuarioDB.email,
                img: usuarioDB.img,
                tipo: usuarioDB.tipo
            },
            token:token,
            id: usuarioDB._id,
        });
    })
    


}

module.exports = loginCtrl;