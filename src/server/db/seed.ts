import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "./connection.js";
import { UserModel } from "../models/user.model.js";

async function seed() {
  await connectDB();
  console.log("Seeding database...");

  // Clear existing data
  await UserModel.deleteMany({});

  // Create sample users
  await UserModel.create([
    {
      email: "admin@example.com",
      name: "Admin User",
      password: "password123",
      role: "admin",
    },
    {
      email: "user@example.com",
      name: "Regular User",
      password: "password123",
      role: "user",
    },
  ]);

  console.log("Seed complete!");
  await mongoose.disconnect();
}

seed().catch(console.error);
