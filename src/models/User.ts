import mongoose, { Schema, model, models } from "mongoose";

export interface IUserDoc extends mongoose.Document {
  email: string;
  password: string;
  name: string;
  role: "admin" | "superadmin";
  createdAt: Date;
}

const UserSchema = new Schema<IUserDoc>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    name: { type: String, required: true, trim: true },
    role: { type: String, enum: ["admin", "superadmin"], default: "admin" },
  },
  { timestamps: true }
);

const User = models.User || model<IUserDoc>("User", UserSchema);
export default User;
