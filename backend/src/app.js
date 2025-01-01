import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authenticate from './middleware/authenticate.js';

dotenv.config();

const app = express();


// CORS settings
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

// Server settings
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Define other routes
app.get('/auth-status', authenticate, (req, res, next) => {
    try {
        if (req.user) {
            res.json({ loggedIn: true, username: req.user.username });
        } else {
            res.json({ loggedIn: false });
        }
    } catch (error) {
        next(error);
    }
});

app.post('/logout', (req, res) => {
    res.clearCookie('authToken', {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    });

    res.status(200).json({ message: 'Logged out successfully' });
});

app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;
