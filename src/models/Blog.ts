import mongoose, { Schema, model, models } from "mongoose";

export interface IBlogImage {
  url: string;
  publicId: string;
}

export interface IBlogDoc extends mongoose.Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: IBlogImage;
  published: boolean;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const BlogImageSchema = new Schema<IBlogImage>(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
  },
  { _id: false }
);

const BlogSchema = new Schema<IBlogDoc>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, unique: true },
    excerpt: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    coverImage: { type: BlogImageSchema, required: true },
    published: { type: Boolean, default: false },
    publishedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

const Blog = models.Blog || model<IBlogDoc>("Blog", BlogSchema);
export default Blog;
