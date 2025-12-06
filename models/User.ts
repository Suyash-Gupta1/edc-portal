import mongoose, { Schema, Document, Model } from 'mongoose';

// there has been some problem regarding storing the reason check it and then delete it 

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  domain: string;
  reason: string; 
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
  reason: {
    type: String,
    required: [true, 'Please provide a reason for joining'],
    default: "No reason provided.", 
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

// IMPORTANT: Delete the model if it exists to prevent caching issues with schema updates in development
if (mongoose.models.User) {
  delete mongoose.models.User;
}

// Explicitly type the model to avoid Union type errors in Next.js API routes
const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);

export default User;