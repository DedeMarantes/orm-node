const {Router} = require('express');
const PessoaController = require('../controllers/PessoaController.js');

const router = Router();

router
.get('/pessoas', PessoaController.getAllPessoas)
.get('/pessoas/:id', PessoaController.getPessoa)
.post('/pessoas', PessoaController.criarPessoa)
.put('/pessoas/:id', PessoaController.atualizarPessoa)
.delete('/pessoas/:id', PessoaController.deletarPessoa)

module.exports = router;