const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs')//npm install bcryptjs--save


const usuarioCtrl = {};

usuarioCtrl.getUsuario = async (req, res) => {

    await Usuario.findById(req.params.id,(err,usuarioDB)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al solicitar usuarios',
                errors: err
            })
        }

        res.status(201).json({
            ok: true,
            usuario: usuarioDB,

        })
    });
  
}

usuarioCtrl.getUsuarios = async (req, res) => {
    
    await Usuario.find((err,usuarios)=>{
            if(err){
                return res.status(400).json({
                    ok:false,
                    mensaje:'Error al solicitar usuarios',
                    errors:err
                })
            }

            res.status(201).json({
                ok:true,
                usuarios:usuarios,

            })
          
        });
    
}

usuarioCtrl.createUsuario = async (req, res) => {
    const usuario = new Usuario({
            nombre:req.body.nombre,
             email: req.body.email,
          password: bcrypt.hashSync(req.body.password),
               img: req.body.img,
              tipo: req.body.tipo
    });
    await usuario.save((err, usuarioGuardado)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                mensaje:'Error al crear usuario',
                errors:err
            })
        }
        res.status(201).json({
            ok:true,
            usuario:usuarioGuardado,
            solicita: req.usuario

        });
    });
    
}



usuarioCtrl.updateUsuario = async (req, res) => {
    const { id } = req.params;
   
    await Usuario.findByIdAndUpdate(id, { $set: req.body }, { new: true } ,(err, usuarioDB) =>{
        if(err){
            return res.status(500).json({
                ok:false,
                errors:err
            })
        }
        usuarioDB.password = 'ok';
        res.status(200).json({
            ok:true,
            mensaje: "Usuario Actualizado",
            usuario:usuarioDB
        });
    });
   

}

usuarioCtrl.deleteUsuario = async (req, res) => {
    await Usuario.findByIdAndRemove(req.params.id,(err, usuarioBorrado) =>{
        if(err){
            return res.status(500).json({
                ok:false,
                errors:err
            })
        }

        res.status(200).json({
            ok: true,
            mensaje: "Usuario Borrado"
        });
    });

    
}

module.exports = usuarioCtrl;