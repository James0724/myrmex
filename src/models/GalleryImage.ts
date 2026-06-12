import mongoose, { Schema, model, models } from "mongoose";

export interface IGalleryImageDoc extends mongoose.Document {
  cloudinaryId: string;
  url: string;
  title: string;
  category: string;
  width?: number;
  height?: number;
  createdAt: Date;
}

const GalleryImageSchema = new Schema<IGalleryImageDoc>(
  {
    cloudinaryId: { type: String, required: true },
    url: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ["power", "security", "networking", "assessment", "design", "general"],
      default: "general",
    },
    width: { type: Number },
    height: { type: Number },
  },
  { timestamps: true }
);

const GalleryImage = models.GalleryImage || model<IGalleryImageDoc>("GalleryImage", GalleryImageSchema);
export default GalleryImage;
