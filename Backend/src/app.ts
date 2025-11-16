import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import compression from 'compression';

import errorHandler from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFoundHandler';

dotenv.config();
const app = express();

// Security
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// Rate limiting
app.use(
  '/api',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000,
  })
);

// CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL?.split(',') || ['http://localhost:3000'],
    credentials: true,
  })
);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Security middlewares
app.use(mongoSanitize());
app.use(hpp());
app.use(compression());

// Logging
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));

// Health Check
app.get('/health', (req, res) => {
  res.json({
    status: 'success',
    message: 'BTMC API running',
    timestamp: new Date().toISOString(),
  });
});

// Add your REAL routes here:
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/events', eventRoutes);

// Catch 404
app.use(notFoundHandler);

// Error handler
app.use(errorHandler);

export default app;
