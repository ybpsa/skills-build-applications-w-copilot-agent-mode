import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import {
  ActivityModel,
  LeaderboardEntryModel,
  TeamModel,
  UserModel,
  WorkoutModel,
} from '../models/index.js';

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
    difficulty: 'beginner' as const,
    durationMinutes: 20,
  },
  {
    title: 'Full-Body Strength',
    description: 'A balanced strength circuit for the major muscle groups.',
    difficulty: 'intermediate' as const,
    durationMinutes: 35,
  },
  {
    title: 'Recovery Flow',
    description: 'Gentle mobility and stretching for an active recovery day.',
    difficulty: 'beginner' as const,
    durationMinutes: 15,
  },
  {
    title: 'Endurance Intervals',
    description: 'Challenging run intervals to build speed and stamina.',
    difficulty: 'advanced' as const,
    durationMinutes: 40,
  },
];

async function seedDatabase(): Promise<void> {
  await connectDatabase();

  try {
    const users = await Promise.all(
      userData.map(({ username, ...data }) =>
        UserModel.findOneAndUpdate({ username }, data, {
          returnDocument: 'after',
          upsert: true,
          runValidators: true,
          setDefaultsOnInsert: true,
        }),
      ),
    );
    const usersByUsername = new Map(
      users.map((user) => [user.username, user._id]),
    );

    const teams = await Promise.all([
      TeamModel.findOneAndUpdate(
        { name: 'Trail Blazers' },
        {
          description: 'A team that loves outdoor runs and weekend hikes.',
          members: [
            usersByUsername.get('alex-runner'),
            usersByUsername.get('jordan-fit'),
          ],
        },
        { returnDocument: 'after', upsert: true, runValidators: true },
      ),
      TeamModel.findOneAndUpdate(
        { name: 'Pulse Squad' },
        {
          description: 'Cycling, strength training, and steady progress.',
          members: [
            usersByUsername.get('sam-cyclist'),
            usersByUsername.get('taylor-strong'),
          ],
        },
        { returnDocument: 'after', upsert: true, runValidators: true },
      ),
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

    await Promise.all(
      activities.map(({ username, day, ...activity }) => {
        const user = usersByUsername.get(username);
        if (!user) {
          throw new Error(`Seed user not found: ${username}`);
        }

        const completedAt = new Date(`2026-10-0${day}T12:00:00.000Z`);
        return ActivityModel.findOneAndUpdate(
          { user, activityType: activity.activityType, completedAt },
          { ...activity, user, completedAt },
          { returnDocument: 'after', upsert: true, runValidators: true },
        );
      }),
    );

    const period = '2026-10';
    await Promise.all(
      userData.map(({ username }, index) => {
        const user = usersByUsername.get(username);
        if (!user) {
          throw new Error(`Seed user not found: ${username}`);
        }

        return LeaderboardEntryModel.findOneAndUpdate(
          { user, period },
          {
            user,
            team: teams[index < 2 ? 0 : 1]._id,
            period,
            points: [820, 690, 760, 640][index],
          },
          { returnDocument: 'after', upsert: true, runValidators: true },
        );
      }),
    );

    await Promise.all(
      workoutData.map(({ title, ...workout }) =>
        WorkoutModel.findOneAndUpdate(
          { title },
          workout,
          { returnDocument: 'after', upsert: true, runValidators: true },
        ),
      ),
    );

    const [userCount, teamCount, activityCount, leaderboardCount, workoutCount] =
      await Promise.all([
        UserModel.countDocuments(),
        TeamModel.countDocuments(),
        ActivityModel.countDocuments(),
        LeaderboardEntryModel.countDocuments(),
        WorkoutModel.countDocuments(),
      ]);

    console.log('Database seeding complete:', {
      users: userCount,
      teams: teamCount,
      activities: activityCount,
      leaderboardEntries: leaderboardCount,
      workouts: workoutCount,
    });
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase().catch((error: unknown) => {
  console.error('Error seeding database:', error);
  process.exitCode = 1;
});
