const express = require('express');
const router = express.Router();

let tasks = [];
let nextId = 1;

router.get('/', (req, res) => {
    res.json(tasks);
});

router.post('/', (req, res) => {
    const { title, description } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }
    const newTask = { id: nextId++, title, description };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

router.put('/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const { title, description } = req.body;

    const task = tasks.find(t => t.id === taskId);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    task.title = title ?? task.title;
    task.description = description ?? task.description;

    res.json(task);
});

router.delete('/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const index = tasks.findIndex(t => t.id === taskId);
    if (index === -1) return res.status(404).json({ error: 'Task not found' });

    tasks.splice(index, 1);
    res.json({ message: 'Task deleted' });
});

module.exports = router;