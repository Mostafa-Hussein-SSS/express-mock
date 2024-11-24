const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON request body
app.use(express.json());

// Sample data (mock database)
let data = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
];

// GET Route
app.get('/items', (req, res) => {
    res.json(data);
});

// POST Route
app.post('/items', (req, res) => {
    const { name } = req.body;

    // Validate request body
    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    const newItem = {
        id: data.length + 1,
        name,
    };

    data.push(newItem);
    res.status(201).json(newItem);
});

// PUT Route
app.put('/items/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    // Validate request body
    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    const itemIndex = data.findIndex(item => item.id == id);

    if (itemIndex === -1) {
        return res.status(404).json({ error: 'Item not found' });
    }

    data[itemIndex].name = name;
    res.json(data[itemIndex]);
});

// DELETE Route
app.delete('/items/:id', (req, res) => {
    const { id } = req.params;

    const itemIndex = data.findIndex(item => item.id == id);

    if (itemIndex === -1) {
        return res.status(404).json({ error: 'Item not found' });
    }

    data.splice(itemIndex, 1);
    res.status(204).send(); // No content
});

// Error handling for 404
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
