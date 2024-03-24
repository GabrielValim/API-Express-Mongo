import { autor } from "../models/Autor.js";
import livro from "../models/Livro.js";

class LivroController {
    static async listarLivros (req, res) {
        try {
            const listaLivros = await livro.find({})
            res.status(200).json(listaLivros);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha na requisição`})
        }
    }

    static async listarLivroPorId (req, res) {
        try {
            const id = req.params.id;
            const livroEncontrado = await livro.findById(id)
            res.status(200).json(livroEncontrado);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha na requisição do livro`})
        }
    }

    static async cadastarLivro (req, res) {
        const novoLivro = req.body;
        try {
            const autorEncontrado = await autor.findById(novoLivro.autor);
            const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc }}
            const livroCriado = await livro.create(livroCompleto)
            res.status(201).json({ message: "criado com sucesso", livro: livroCriado});
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha ao cadastrar o livro`})
        }
    }

    static async atualizarLivro (req, res) {
        try {
            const id = req.params.id;
            await livro.findByIdAndUpdate(id, req.body)
            res.status(200).json({massage: `${erro.massage} - livro atualizado`});
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisição do livro`})
        }
    }
   
    static async excluirLivro (req, res) {
        try {
            const id = req.params.id
            await livro.findByIdAndDelete(id)
            res.status(200).send("Livro excluido com sucesso!");
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na exclusão do livro`})
        }
    }

    static async listarLivrosPorEditora (req, res) {
        const editora = req.query.editora;
        try {
            const livrosPorEditora = await livro.find({ editora: editora })
            res.status(200).json(livrosPorEditora)
        } catch (error) {
            res.status(500).json({ message: `${erro.message} - falha na busca`})
        }
    }
};


export default LivroController