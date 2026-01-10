import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  mobileNumber: string;
  password: string;
  domain: string;
  reason: string;
  round: number;
  isAdmin: boolean; // ✅ Added here
  hasSelection: boolean;
  applicationStatus: 'active' | 'rejected';
  createdAt: Date;
  selfRating: number;
  responses: { question: string; answer: string }[];
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
  mobileNumber: {
    type: String,
    required: false, 
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
  round: {
    type: Number,
    default: 0, 
  },
  // ✅ Added isAdmin field definition
  isAdmin: {
    type: Boolean,
    default: false, 
  },
  hasSelection: {
    type: Boolean,
    default: false,
  },
  applicationStatus: {
    type: String,
    enum: ['active', 'rejected'],
    default: 'active',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  selfRating: {
    type: Number,
    default: 0,
  },
  responses: [{
    question: { type: String },
    answer: { type: String }
  }]
});

// IMPORTANT: Delete the model if it exists to prevent caching issues with schema updates in development
if (mongoose.models.User) {
  delete mongoose.models.User;
}

const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);

export default User;