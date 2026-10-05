import { model, Schema } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, required: true, min: 0, default: 0 },
    period: { type: String, required: true, trim: true },
  },
  { timestamps: true, collection: 'leaderboard' },
);

export const leaderboard = model('Leaderboard', leaderboardSchema);
