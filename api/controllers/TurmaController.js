const database = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

class TurmaController {
    static async getAllTurmas(req, res) {
        const {data_inicial, data_final} = req.query
        const where = {}
        data_inicial || data_final ? where.data_inicio = {} : null
        data_inicial ? where.data_inicio[Op.gte] = data_inicial : null
        data_final ? where.data_inicio[Op.lte] = data_final : null 
        try {
            const todasTurmas = await database.Turmas.findAll({ where });
            return res.status(200).json(todasTurmas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    static async getTurma(req, res) {
        const { id } = req.params
        try {
            const turma = await database.Turmas.findOne({ where: { id: Number(id) } })
            //const turma = database.Turmas.findById(id)
            return res.status(200).json(turma);
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criarTurma(req, res) {
        const novaTurma = req.body
        try {
            const novaTurmaCriada = await database.Turmas.create(novaTurma)
            return res.status(201).json(novaTurmaCriada);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async atualizarTurma(req, res) {
        const { id } = req.params
        const novasInfos = req.body
        try {
            await database.Turmas.update(novasInfos, { where: { id: Number(id) } })// atualizar banco retorna booleano
            const turmaAtualizada = await database.Turmas.findOne({
                where: {
                    id: Number(id)
                }
            })// encontrar a turma atualizada no banco
            return res.status(200).json(turmaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async deletarTurma(req, res) {
        const { id } = req.params
        try {
            await database.Turmas.destroy({
                where: {
                    id: Number(id)
                }
            })
            return res.status(200).send(`${id} foi deletada com sucesso`)
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = TurmaController
