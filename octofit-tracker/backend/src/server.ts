import express from 'express';

const app = express();
const PORT = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:8000`;

app.use(express.json());

app.get('/api/users/', (_req, res) => {
  res.json([]);
});

app.get('/api/teams/', (_req, res) => {
  res.json([]);
});

app.get('/api/activities/', (_req, res) => {
  res.json([]);
});

app.get('/api/leaderboard/', (_req, res) => {
  res.json([]);
});

app.get('/api/workouts/', (_req, res) => {
  res.json([]);
});

app.listen(PORT, () => {
  console.log(`API server listening on port ${PORT} at ${baseUrl}`);
});

export default app;
