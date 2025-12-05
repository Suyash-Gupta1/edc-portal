import mongoose from 'mongoose';


const FALLBACK_URI = "mongodb+srv://SuyashGupta:<db_password>@cluster0.dgobo2d.mongodb.net/?appName=Cluster0";
const MONGODB_URI = process.env.MONGODB_URI || FALLBACK_URI;


declare global {
  var mongoose: any;
}

let cached = (globalThis as any).mongoose;

if (!cached) {
  cached = (globalThis as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
  }

  
  if (MONGODB_URI.includes('<db_password>')) {
    throw new Error('Invalid MongoDB URI: Please replace <db_password> with your actual database password in lib/db.ts');
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;