const express = require('express');
const router = express.Router();
const mdAuth = require('../middlewares/autenticacion');

const usuarioController = require('../controllers/usuarios.controller');

router.get('/',mdAuth.verificaToken, usuarioController.getUsuarios);
router.post('/', mdAuth.verificaToken, usuarioController.createUsuario);
router.get('/:id', mdAuth.verificaToken, usuarioController.getUsuario);
router.put('/:id', mdAuth.verificaToken, usuarioController.updateUsuario);
router.delete('/:id', mdAuth.verificaToken, usuarioController.deleteUsuario);

module.exports = router;