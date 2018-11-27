const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator') //npm install mongoose-unique-validator --save
const { Schema } = mongoose;

// uniqueValidator
var usuariosValidos={
    values: ['user','admin','root'],
    message:'{VALUE} no es un tipo de usuario valido'
}

const UsuarioSchema = new Schema({
     
      nombre: { type: String, required: [true, 'El nombre es necesario'] },
       email: { type: String, required: [true, 'El email es necesario'], unique: true },
    password: { type: String, required: [true, 'La contraseña es necesaria'] },
         img: { type: String, required: false},
        tipo: { type: String, required: true, default:'user', enum: usuariosValidos}
}, {
        versionKey: false // quitar _v
    });

    UsuarioSchema.plugin(uniqueValidator,{message:'El correo debe de ser unico'});
module.exports = mongoose.model('Usuario', UsuarioSchema);