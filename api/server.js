const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());

app.get('/api/user', (req, res) => {
    const state = req.query.state || 'active';
    const db = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf-8'));
    res.json(db.userStates[state]);
});

app.get('/api/day/:id', (req, res) => {
    const db = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf-8'));
    const dayData = db.challenges[req.params.id];
    dayData ? res.json(dayData) : res.status(404).json({ error: "Day not found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Backend API running on port ${PORT}`));