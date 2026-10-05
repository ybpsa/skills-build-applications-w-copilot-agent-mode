import { model, Schema, Types } from 'mongoose';

interface User {
  username: string;
  email: string;
  displayName: string;
}

interface Team {
  name: string;
  description?: string;
  members: Types.ObjectId[];
}

interface Activity {
  user: Types.ObjectId;
  activityType: string;
  durationMinutes: number;
  calories?: number;
  completedAt: Date;
}

interface LeaderboardEntry {
  user: Types.ObjectId;
  team?: Types.ObjectId;
  points: number;
  period: string;
}

interface Workout {
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
}

const userSchema = new Schema<User>(
  {
    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    displayName: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

const teamSchema = new Schema<Team>(
  {
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

const activitySchema = new Schema<Activity>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    activityType: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    calories: { type: Number, min: 0 },
    completedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const leaderboardEntrySchema = new Schema<LeaderboardEntry>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, required: true, min: 0, default: 0 },
    period: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

const workoutSchema = new Schema<Workout>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
  },
  { timestamps: true },
);

export const UserModel = model<User>('User', userSchema);
export const TeamModel = model<Team>('Team', teamSchema);
export const ActivityModel = model<Activity>('Activity', activitySchema);
export const LeaderboardEntryModel = model<LeaderboardEntry>(
  'LeaderboardEntry',
  leaderboardEntrySchema,
);
export const WorkoutModel = model<Workout>('Workout', workoutSchema);
