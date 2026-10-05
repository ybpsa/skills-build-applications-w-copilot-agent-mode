import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import { activity } from '../models/activity.js';
import { leaderboard } from '../models/leaderboard.js';
import { team } from '../models/team.js';
import { user } from '../models/user.js';
import { workout } from '../models/workout.js';

const userData = [
  { username: 'alex-runner', email: 'alex@example.com', displayName: 'Alex Rivera' },
  { username: 'jordan-fit', email: 'jordan@example.com', displayName: 'Jordan Lee' },
  { username: 'sam-cyclist', email: 'sam@example.com', displayName: 'Sam Patel' },
  { username: 'taylor-strong', email: 'taylor@example.com', displayName: 'Taylor Morgan' },
];

const workoutData = [
  {
    title: 'Quick Cardio',
    description: 'A brisk, low-equipment session to raise your heart rate.',
    difficulty: 'beginner',
    durationMinutes: 20,
  },
  {
    title: 'Full-Body Strength',
    description: 'A balanced strength circuit for the major muscle groups.',
    difficulty: 'intermediate',
    durationMinutes: 35,
  },
  {
    title: 'Recovery Flow',
    description: 'Gentle mobility and stretching for an active recovery day.',
    difficulty: 'beginner',
    durationMinutes: 15,
  },
  {
    title: 'Endurance Intervals',
    description: 'Challenging run intervals to build speed and stamina.',
    difficulty: 'advanced',
    durationMinutes: 40,
  },
];

// Seed the octofit_db database with test data.
async function seedDatabase(): Promise<void> {
  await connectDatabase();

  try {
    await Promise.all([
      user.deleteMany({}),
      team.deleteMany({}),
      activity.deleteMany({}),
      leaderboard.deleteMany({}),
      workout.deleteMany({}),
    ]);

    const users = await user.insertMany(userData);
    const usersByUsername = new Map(
      users.map((record) => [record.username, record._id]),
    );
    const teams = await team.insertMany([
      {
        name: 'Trail Blazers',
        description: 'A team that loves outdoor runs and weekend hikes.',
        members: [
          usersByUsername.get('alex-runner'),
          usersByUsername.get('jordan-fit'),
        ],
      },
      {
        name: 'Pulse Squad',
        description: 'Cycling, strength training, and steady progress.',
        members: [
          usersByUsername.get('sam-cyclist'),
          usersByUsername.get('taylor-strong'),
        ],
      },
    ]);

    const activities = [
      { username: 'alex-runner', activityType: 'Running', durationMinutes: 32, calories: 310, day: 1 },
      { username: 'jordan-fit', activityType: 'Strength Training', durationMinutes: 40, calories: 260, day: 1 },
      { username: 'sam-cyclist', activityType: 'Cycling', durationMinutes: 45, calories: 420, day: 2 },
      { username: 'taylor-strong', activityType: 'Yoga', durationMinutes: 28, calories: 120, day: 2 },
      { username: 'alex-runner', activityType: 'Hiking', durationMinutes: 55, calories: 480, day: 3 },
      { username: 'jordan-fit', activityType: 'Running', durationMinutes: 25, calories: 240, day: 3 },
      { username: 'sam-cyclist', activityType: 'Strength Training', durationMinutes: 36, calories: 230, day: 4 },
      { username: 'taylor-strong', activityType: 'Cycling', durationMinutes: 38, calories: 350, day: 4 },
    ];

    await activity.insertMany(
      activities.map(({ username, day, ...record }) => {
        const userId = usersByUsername.get(username);
        if (!userId) {
          throw new Error(`Seed user not found: ${username}`);
        }

        return {
          ...record,
          user: userId,
          completedAt: new Date(`2026-10-0${day}T12:00:00.000Z`),
        };
      }),
    );

    await leaderboard.insertMany(
      userData.map(({ username }, index) => {
        const userId = usersByUsername.get(username);
        if (!userId) {
          throw new Error(`Seed user not found: ${username}`);
        }

        return {
          user: userId,
          team: teams[index < 2 ? 0 : 1]._id,
          period: '2026-10',
          points: [820, 690, 760, 640][index],
        };
      }),
    );

    await workout.insertMany(workoutData);

    console.log('Database seeding complete:', {
      users: users.length,
      teams: teams.length,
      activities: activities.length,
      leaderboardEntries: userData.length,
      workouts: workoutData.length,
    });
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase().catch((error: unknown) => {
  console.error('Error seeding database:', error);
  process.exitCode = 1;
});
