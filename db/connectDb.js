
import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('Database connected');
  } catch (error) {
    console.error('DB connection failed:', error.message);
    process.exit(1);

  }
};

export default connectDb;