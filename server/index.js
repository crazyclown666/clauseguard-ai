import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { injectSpeedInsights } from '@vercel/speed-insights';

import analyzeRoutes from './routes/analyze.js';
import stripeRoutes from './routes/stripe.js';
import sampleRoutes from './routes/samples.js';

dotenv.config();

// Initialize Vercel Speed Insights
injectSpeedInsights();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Mount API Routes
app.use('/api/analyze', analyzeRoutes);
app.use('/api/checkout', stripeRoutes);
app.use('/api/samples', sampleRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'ClauseGuard AI Engine',
    timestamp: new Date().toISOString(),
    geminiEnabled: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'YOUR_GEMINI_API_KEY'),
    stripeEnabled: Boolean(process.env.STRIPE_SECRET_KEY && !process.env.STRIPE_SECRET_KEY.startsWith('sk_test_placeholder'))
  });
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`  🛡️  ClauseGuard AI Server running on port ${PORT}`);
  console.log(`  🔗  API URL: http://localhost:${PORT}/api/health`);
  console.log(`====================================================`);
});
