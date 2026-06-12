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

export interface IGalleryImage {
  _id: string;
  cloudinaryId: string;
  url: string;
  title: string;
  category: ServiceCategory;
  width?: number;
  height?: number;
  createdAt: string;
}

export interface IUser {
  _id: string;
  email: string;
  name: string;
  role: "admin" | "superadmin";
  createdAt: string;
}

export interface AdminStats {
  totalMessages: number;
  unreadMessages: number;
  totalAppointments: number;
  pendingAppointments: number;
  confirmedAppointments: number;
  totalGalleryImages: number;
}
