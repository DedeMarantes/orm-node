const {Router} = require('express');
const TurmaController = require('../controllers/TurmaController.js');

const router = Router();

router
.get('/turmas', TurmaController.getAllTurmas)
.get('/turmas/:id', TurmaController.getTurma)
.post('/turmas', TurmaController.criarTurma)
.put('/turmas/:id', TurmaController.atualizarTurma)
.delete('/turmas/:id', TurmaController.deletarTurma)

module.exports = router;