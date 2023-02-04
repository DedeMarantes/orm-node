const database = require('../models')

class PessoaController {
    static async getAllPessoas(req, res) {
        try {
            const todasPessoas = await database.Pessoas.findAll();
            return res.status(200).json(todasPessoas);
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async getPessoa(req, res) {
        const { id } = req.params
        try {
            const pessoa = await database.Pessoas.findOne({ where: { id: Number(id) } })
            //const pessoa = database.Pessoas.findById(id)
            return res.status(200).json(pessoa);
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criarPessoa(req, res) {
        const novaPessoa = req.body
        try {
            const novaPessoaCriada = await database.Pessoas.create(novaPessoa)
            return res.status(201).json(novaPessoaCriada);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async atualizarPessoa(req, res) {
        const { id } = req.params
        const novasInfos = req.body
        try {
            await database.Pessoas.update(novasInfos, { where: { id: Number(id) } })// atualizar banco retorna booleano
            const pessoaAtualizada = await database.Pessoas.findOne({
                where: {
                    id: Number(id)
                }
            })// encontrar a pessoa atualizada no banco
            return res.status(200).json(pessoaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async deletarPessoa(req, res) {
        const {id} = req.params
        const nome = req.body['nome'];
        try {
            await database.Pessoas.destroy({where: {
                id: Number(id)
            }})
            return res.status(200).send(`${nome} foi deletada com sucesso`)
        } catch(error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = PessoaController