import mongoose, { Schema, model, models } from "mongoose";

export interface IProjectImage {
  url: string;
  publicId: string;
}

export type ProjectCategory = "power-electricals" | "security" | "networking";

export interface IProjectDoc extends mongoose.Document {
  title: string;
  category: ProjectCategory;
  shortDescription: string;
  coverImage: IProjectImage;
  images: IProjectImage[];
  createdAt: Date;
  updatedAt: Date;
}

const ProjectImageSchema = new Schema<IProjectImage>(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
  },
  { _id: false }
);

const ProjectSchema = new Schema<IProjectDoc>(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ["power-electricals", "security", "networking"],
    },
    shortDescription: { type: String, required: true, trim: true },
    coverImage: { type: ProjectImageSchema, required: true },
    images: { type: [ProjectImageSchema], default: [] },
  },
  { timestamps: true }
);

const Project = models.Project || model<IProjectDoc>("Project", ProjectSchema);
export default Project;
