const database = require('../models')

class PessoaController {
    static async getAllPessoasAtivas(req, res) {
        try {
            const todasPessoasAtivas = await database.Pessoas.findAll();
            return res.status(200).json(todasPessoasAtivas);
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async getAllPessoas(req, res) {
        try {
            const todasPessoas = await database.Pessoas.scope('todos').findAll();
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
        const { id } = req.params
        const nome = req.body['nome'];
        try {
            await database.Pessoas.destroy({
                where: {
                    id: Number(id)
                }
            })
            return res.status(200).send(`${nome} foi deletada com sucesso`)
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async restauraPessoa(req, res) {
        const {id} = req.params
        try {
            await database.Pessoas.restore({ where: {
                id: Number(id)
            }})
            return res.status(200).json({mensagem: `id ${id} ?? restaurado`})
        } catch (error) {
            return res.send(500).json(error.message)
        }
    }

    static async getMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params;
        try {
            const umaMatricula = await database.Matriculas.findOne({
                where:
                {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            })
            return res.status(200).json(umaMatricula)
        } catch (error) {
            return res.send(500).json(error.message)
        }
    }

    static async criaMatricula(req, res) {
        const {estudanteId} = req.params
        const novaMatricula = {...req.body, estudante_id: Number(estudanteId)}
        try {
            const novaMatriculaCriada = await database.Matriculas.create(novaMatricula)
            return res.status(200).json(novaMatriculaCriada);
        } catch(error) {
            res.status(500).json(error.message)
        }
    }

    static async atualizaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        const novasInfos = req.body
        try {
            await database.Matriculas.update(novasInfos, { where: 
                { 
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)

                 } })// atualizar banco retorna booleano
            const matriculaAtualizada = await database.Matriculas.findOne({
                where: {
                    id: Number(matriculaId)
                }
            })// encontrar a matricula atualizada no banco
            return res.status(200).json(matriculaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async deletarMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        try {
            await database.Matriculas.destroy({
                where: {
                    id: Number(matriculaId)
                }
            })
            return res.status(200).send(`${matriculaId} foi deletada com sucesso`)
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async pegaMatriculas(req, res) {
        const {estudanteId} = req.params
        try {
            const pessoa = await database.Pessoas.findOne({where: {
                id: Number(estudanteId)
            }})
            const matriculas = await pessoa.getAulasMatriculadas()
            res.status(200).json(matriculas)
        } catch (error) {
            res.status(500).json(error.message)
        }
    }

    static async pegaMatriculasPorTurma(req, res) {
        const {turmaId} = req.params
        try {
            const todasAsMatriculas = await database.Matriculas.findAndCountAll({where: {
                turma_id: Number(turmaId),
                status: 'confirmado'
            },
            limit: 20,
            order: [['estudante_id', 'ASC']]
        })
            res.status(200).json(todasAsMatriculas)
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
}

module.exports = PessoaController