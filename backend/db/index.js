import mongoose from "mongoose";

const connectDB = async() =>{
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGO_URL}`)
    console.log(`DB Connected ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("MongoDB Connection Failed" , error);
    process.exit(1);
  }
}

export default connectDB;