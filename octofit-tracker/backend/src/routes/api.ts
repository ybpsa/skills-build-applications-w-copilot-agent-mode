import { Router } from 'express';
import { activity } from '../models/activity.js';
import { leaderboard } from '../models/leaderboard.js';
import { team } from '../models/team.js';
import { user } from '../models/user.js';
import { workout } from '../models/workout.js';

const router = Router();

router.get('/api/users', async (_request, response) => {
  response.json(await user.find().sort({ displayName: 1 }).lean());
});

router.post('/api/users', async (request, response) => {
  response.status(201).json(await user.create(request.body));
});

router.get('/api/teams', async (_request, response) => {
  response.json(await team.find().populate('members').sort({ name: 1 }).lean());
});

router.post('/api/teams', async (request, response) => {
  response.status(201).json(await team.create(request.body));
});

router.get('/api/activities', async (_request, response) => {
  response.json(
    await activity.find()
      .populate('user')
      .sort({ completedAt: -1 })
      .lean(),
  );
});

router.post('/api/activities', async (request, response) => {
  response.status(201).json(await activity.create(request.body));
});

router.get('/api/leaderboard', async (_request, response) => {
  response.json(
    await leaderboard.find()
      .populate('user team')
      .sort({ points: -1 })
      .lean(),
  );
});

router.post('/api/leaderboard', async (request, response) => {
  response.status(201).json(await leaderboard.create(request.body));
});

router.get('/api/workouts', async (_request, response) => {
  response.json(await workout.find().sort({ title: 1 }).lean());
});

router.post('/api/workouts', async (request, response) => {
  response.status(201).json(await workout.create(request.body));
});

export default router;
