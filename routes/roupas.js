const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM roupa');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar roupas', detalhes: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM roupa WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Roupa não encontrada' });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar roupa', detalhes: err.message });
    }
});

router.post('/', async (req, res) => {
    const { descricao, tamanho, preco } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO roupa (descricao, tamanho, preco) VALUES (?, ?, ?)',
            [descricao, tamanho, preco]
        );
        res.status(201).json({ id: result.insertId, descricao, tamanho, preco });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao cadastrar roupa', detalhes: err.message });
    }
});

router.put('/:id', async (req, res) => {
    const { descricao, tamanho, preco } = req.body;
    try {
        const [result] = await db.query(
            'UPDATE roupa SET descricao = ?, tamanho = ?, preco = ? WHERE id = ?',
            [descricao, tamanho, preco, req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Roupa não encontrada para atualização' });
        }
        res.json({ id: req.params.id, descricao, tamanho, preco });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao atualizar roupa', detalhes: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const [result] = await db.query('DELETE FROM roupa WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Roupa não encontrada para exclusão' });
        }
        res.json({ message: 'Roupa deletada com sucesso' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao deletar roupa', detalhes: err.message });
    }
});

module.exports = router;