import mongoose, { Schema, model, models } from "mongoose";

export interface IAppointmentDoc extends mongoose.Document {
  name: string;
  email: string;
  phone: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const AppointmentSchema = new Schema<IAppointmentDoc>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    service: {
      type: String,
      required: true,
      enum: ["power", "security", "networking", "assessment", "design", "general"],
    },
    preferredDate: { type: String, required: true },
    preferredTime: { type: String, required: true },
    message: { type: String, trim: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Appointment = models.Appointment || model<IAppointmentDoc>("Appointment", AppointmentSchema);
export default Appointment;
