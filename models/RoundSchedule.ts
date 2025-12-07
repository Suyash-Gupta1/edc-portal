import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IRoundSchedule extends Document {
  round: number; // 1, 2, 3, etc.
  description: string;
  updatedAt: Date;
}

const RoundScheduleSchema = new Schema<IRoundSchedule>({
  round: { type: Number, required: true, unique: true },
  description: { type: String, default: '' },
  updatedAt: { type: Date, default: Date.now },
});

// Delete model if exists to prevent overwriting errors during hot reload
if (mongoose.models.RoundSchedule) {
  delete mongoose.models.RoundSchedule;
}

const RoundSchedule: Model<IRoundSchedule> = mongoose.model<IRoundSchedule>('RoundSchedule', RoundScheduleSchema);

export default RoundSchedule;