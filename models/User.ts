import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  domain: string;
  round: number;
  hasSelection: boolean;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
  domain: {
    type: String,
    required: [true, 'Please select a domain'],
  },
  // Tracks the selection round: 0 (Applied), 1-3 (Interview Rounds), 4 (Selected)
  round: {
    type: Number,
    default: 0, 
  },
  hasSelection: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Explicitly type the model to avoid Union type errors in Next.js API routes
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;