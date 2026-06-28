export type ServiceCategory =
  | "power"
  | "security"
  | "networking"
  | "assessment"
  | "design"
  | "general";

export type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled";
export type MessageStatus = "unread" | "read" | "replied";

export interface IAppointment {
  _id: string;
  name: string;
  email: string;
  phone: string;
  service: ServiceCategory;
  preferredDate: string;
  preferredTime: string;
  message?: string;
  status: AppointmentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface IMessage {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: MessageStatus;
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  _id: string;
  email: string;
  name: string;
  role: "admin" | "superadmin";
  avatar?: string;
  avatarPublicId?: string;
  createdAt: string;
}

export type ProjectCategory = "power-electricals" | "security" | "networking";

export interface IProjectImage {
  url: string;
  publicId: string;
}

export interface IProject {
  _id: string;
  title: string;
  category: ProjectCategory;
  shortDescription: string;
  coverImage: IProjectImage;
  images: IProjectImage[];
  createdAt: string;
  updatedAt: string;
}

export interface IBlogImage {
  url: string;
  publicId: string;
}

export interface IBlog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: IBlogImage;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AdminStats {
  totalMessages: number;
  unreadMessages: number;
  totalAppointments: number;
  pendingAppointments: number;
  confirmedAppointments: number;
  totalProjects: number;
  totalBlogPosts: number;
  publishedBlogPosts: number;
}
