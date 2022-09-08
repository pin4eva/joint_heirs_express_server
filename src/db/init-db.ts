import mongoose from "mongoose";

export const connectDB = async (uri: string) => {
  try {
    const db = await mongoose.connect(uri);
    console.log(`Mongodb started on ${db.connection.host}`);
    return db;
  } catch (error) {
    process.exit(1);
  }
};
