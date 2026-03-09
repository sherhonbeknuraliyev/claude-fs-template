import mongoose, { Schema, type Document } from "mongoose";
import type { User } from "@shared/schemas/user.schema.js";

export interface UserDocument extends Omit<User, "_id">, Document {}

const userSchemaDB = new Schema<UserDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model<UserDocument>("User", userSchemaDB);
