//routes/niveisRoute.js

const { Router } = require('express')
const NivelController = require('../controllers/NivelController')

const router = Router()
router
 .get('/niveis', NivelController.getAllNiveis)
 .get('/niveis/:id', NivelController.getNivel)
 .post('/niveis', NivelController.criarNivel)
 .put('/niveis/:id', NivelController.atualizarNivel)
 .delete('/niveis/:id', NivelController.deletarNivel)

module.exports = router