import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import apiRoutes from './routes/api.js';

const app = express();
const codespaceName = process.env.CODESPACE_NAME;
const allowedOrigins = [
  'http://localhost:5173',
  ...(codespaceName
    ? [`https://${codespaceName}-5173.app.github.dev`]
    : []),
];

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());
app.get('/api/health', (_request, response) => {
  const databaseConnected = mongoose.connection.readyState === 1;
  response.status(databaseConnected ? 200 : 503).json({
    status: databaseConnected ? 'ok' : 'unavailable',
    database: databaseConnected ? 'connected' : 'disconnected',
  });
});
app.use(apiRoutes);

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  if (error instanceof mongoose.Error.ValidationError) {
    response.status(400).json({ error: error.message });
    return;
  }

  if (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    error.code === 11000
  ) {
    response.status(409).json({ error: 'A record with that unique value already exists.' });
    return;
  }

  console.error('API request failed:', error);
  response.status(500).json({ error: 'Internal server error.' });
});

export default app;
