const {Router} = require('express');
const PessoaController = require('../controllers/PessoaController.js');

const router = Router();

router
.get('/pessoas', PessoaController.getAllPessoas)
.get('/pessoas/:id', PessoaController.getPessoa)
.get('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.getMatricula)
.post('/pessoas', PessoaController.criarPessoa)
.post('/pessoas/:estudanteId/matriculas', PessoaController.criaMatricula)
.post('/pessoas/:id/restaura', PessoaController.restauraPessoa)
.put('/pessoas/:id', PessoaController.atualizarPessoa)
.put('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.atualizaMatricula)
.delete('/pessoas/:id', PessoaController.deletarPessoa)
.delete('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.deletarMatricula)

module.exports = router;