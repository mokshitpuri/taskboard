const express = require('express');
const cors = require('cors');
const tasksRouter = require('./routes/tasks');

const app = express();
const PORT = 5000;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

app.use('/api/tasks', tasksRouter);

app.listen(PORT, () => {
    console.log(`Node backend running on http://localhost:${PORT}`);
});