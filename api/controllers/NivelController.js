const database = require('../models')

class NivelController {
    static async getAllNiveis(req, res) {
        try {
            const todosNiveis = await database.Niveis.findAll();
            return res.status(200).json(todosNiveis)
        } catch(error) {
            return res.status(500).json(error.message)
        }
    }
    static async getNivel(req, res) {
        const { id } = req.params
        try {
            const nivel = await database.Niveis.findOne({ where: { id: Number(id) } })
            //const nivel = database.Niveis.findById(id)
            return res.status(200).json(nivel);
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criarNivel(req, res) {
        const novaNivel = req.body
        try {
            const novaNivelCriada = await database.Niveis.create(novaNivel)
            return res.status(201).json(novaNivelCriada);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async atualizarNivel(req, res) {
        const { id } = req.params
        const novasInfos = req.body
        try {
            await database.Niveis.update(novasInfos, { where: { id: Number(id) } })// atualizar banco retorna booleano
            const nivelAtualizada = await database.Niveis.findOne({
                where: {
                    id: Number(id)
                }
            })// encontrar a nivel atualizada no banco
            return res.status(200).json(nivelAtualizada)
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async deletarNivel(req, res) {
        const {id} = req.params
        try {
            await database.Niveis.destroy({where: {
                id: Number(id)
            }})
            return res.status(200).send(`${id} foi deletada com sucesso`)
        } catch(error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = NivelController
