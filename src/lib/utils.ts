export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-KE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleString("en-KE", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export const SERVICE_LABELS: Record<string, string> = {
  power: "Power Systems & Electrical",
  security: "Security Systems",
  networking: "Networking & Communication",
  assessment: "Routine Assessments",
  design: "System Design & Technical Drawings",
  general: "General Enquiry",
};
