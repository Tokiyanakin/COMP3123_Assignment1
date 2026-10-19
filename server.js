require('dotenv').config();

const fs = require('fs');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const errorHandler = require('./middleware/errorMiddleware');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
const logDirectory = path.join(__dirname, 'logs');

if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, { recursive: true });
}

const accessLogStream = fs.createWriteStream(
    path.join(logDirectory, 'access.log'),
    { flags: 'a' }
);

app.use(morgan('dev'));
app.use(morgan('combined', { stream: accessLogStream }));

app.use('/api/v1/user', authRoutes);
app.use('/api/v1/emp/employees', employeeRoutes);

app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Server is running',
        database: mongoose.connection.readyState === 1
            ? 'connected'
            : 'disconnected',
        timestamp: new Date().toISOString()
    });
});

app.use((req, res) => {
    res.status(404).json({
        message: 'Route not found'
    });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();