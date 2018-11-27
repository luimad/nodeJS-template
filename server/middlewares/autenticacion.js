const jwt = require('jsonwebtoken'); //npm install jsonwebtoken --save
const SEED = require('../config/config').SEED;


exports.verificaToken = function(req, res, next){
    var token = req.headers.token;

    jwt.verify(token, SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: 'token no valido',
                errors: err
            });
        }
       
        // Quien hiso la peticion
        req.usuario = decoded.usuario;
        req.usuario.password = '=D';
        next();
    });
}

