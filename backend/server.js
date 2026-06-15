import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { sendEmail } from './routes/email.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173', // Vite default dev port
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    process.env.FRONTEND_URL || '', // Add production URL via env variable
  ].filter(Boolean),
  credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'Backend is running' });
});

// Email route
app.post('/api/send-email', sendEmail);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log('📧 Email endpoint: POST /api/send-email');
  console.log('❤️  Health check: GET /api/health');
});
