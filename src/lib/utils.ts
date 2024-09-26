import { clsx, type ClassValue } from "clsx"
import mongoose from "mongoose"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const connectToDatabase = async () => {
  try{
    if(mongoose.connections && mongoose.connections[0].readyState) return;
    
    const {connection} = await mongoose.connect(
      process.env.MONGODB_URI as string,
      {
        dbName: "quizzzApp" 
      }
    )
    console.log(`Connected to MongoDB ${connection.host}`);

  }catch{
    console.log("mongoose connection not found")
  }
}