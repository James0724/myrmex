"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Calendar, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(7, "Phone number required"),
  service: z.enum(["power", "security", "networking", "assessment", "design", "general"]),
  preferredDate: z.string().min(1, "Please select a date"),
  preferredTime: z.string().min(1, "Please select a time"),
  message: z.string().max(1000).optional(),
});

type FormData = z.infer<typeof schema>;

const serviceOptions = [
  { value: "power",      label: "Electrical & Solar Services" },
  { value: "security",   label: "Security Systems & CCTV" },
  { value: "networking", label: "Networking & Communication" },
  { value: "assessment", label: "Routine Maintenance & Support" },
  { value: "design",     label: "System Design" },
  { value: "general",    label: "General Enquiry" },
];

const timeSlots = [
  "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
];

export default function AppointmentForm({ dark = false }: { dark?: boolean }) {
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split("T")[0];

  const onSubmit = async (data: FormData) => {
    setServerError("");
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Booking failed");
      setSuccess(true);
      reset();
    } catch {
      setServerError("Booking failed. Please try again or call us directly.");
    }
  };

  const label = cn(
    "block text-xs font-bold uppercase tracking-widest mb-2",
    dark ? "text-white/40" : "text-gray-400"
  );
  const input = cn(
    "w-full px-4 py-3 border text-sm outline-none transition-all",
    dark
      ? "bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-brand-green focus:bg-white/10"
      : "bg-white border-gray-200 text-brand-dark placeholder:text-gray-300 focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
  );
  const optionClass = dark ? "bg-brand-darker text-white" : "";

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className={cn("w-14 h-14 border flex items-center justify-center mb-5", dark ? "border-brand-green/40" : "border-brand-green/30")}>
          <CheckCircle2 size={28} className="text-brand-green" />
        </div>
        <h3 className={cn("font-display text-2xl font-700 uppercase mb-2", dark ? "text-white" : "text-brand-darker")}>
          Consultation Booked!
        </h3>
        <p className={cn("text-sm mb-6", dark ? "text-white/50" : "text-gray-500")}>
          Your request has been received. We&apos;ll confirm shortly.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="text-brand-green text-xs font-bold uppercase tracking-widest underline"
        >
          Book another appointment
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={label}>Full Name <span className="text-red-400">*</span></label>
          <input {...register("name")} placeholder="John Kamau" className={input} />
          {errors.name && <p className="text-red-400 text-xs mt-1.5">{errors.name.message}</p>}
        </div>
        <div>
          <label className={label}>Phone <span className="text-red-400">*</span></label>
          <input {...register("phone")} placeholder="+254 704 184 932" className={input} />
          {errors.phone && <p className="text-red-400 text-xs mt-1.5">{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label className={label}>Email Address <span className="text-red-400">*</span></label>
        <input {...register("email")} type="email" placeholder="john@example.com" className={input} />
        {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email.message}</p>}
      </div>

      <div>
        <label className={label}>Service Required <span className="text-red-400">*</span></label>
        <select {...register("service")} className={cn(input, dark ? "bg-brand-darker" : "bg-white")}>
          <option value="" className={optionClass}>Select a service...</option>
          {serviceOptions.map((opt) => (
            <option key={opt.value} value={opt.value} className={optionClass}>{opt.label}</option>
          ))}
        </select>
        {errors.service && <p className="text-red-400 text-xs mt-1.5">{errors.service.message}</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={label}>Preferred Date <span className="text-red-400">*</span></label>
          <input {...register("preferredDate")} type="date" min={minDateStr} className={input} />
          {errors.preferredDate && <p className="text-red-400 text-xs mt-1.5">{errors.preferredDate.message}</p>}
        </div>
        <div>
          <label className={label}>Preferred Time <span className="text-red-400">*</span></label>
          <select {...register("preferredTime")} className={cn(input, dark ? "bg-brand-darker" : "bg-white")}>
            <option value="" className={optionClass}>Select time...</option>
            {timeSlots.map((t) => (
              <option key={t} value={t} className={optionClass}>{t}</option>
            ))}
          </select>
          {errors.preferredTime && <p className="text-red-400 text-xs mt-1.5">{errors.preferredTime.message}</p>}
        </div>
      </div>

      <div>
        <label className={label}>Additional Notes</label>
        <textarea
          {...register("message")}
          rows={3}
          placeholder="Briefly describe your property and what needs assessing..."
          className={cn(input, "resize-none")}
        />
      </div>

      {serverError && (
        <p className="text-red-400 text-xs bg-red-500/10 px-4 py-3 border border-red-500/20">{serverError}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-fill w-full flex items-center justify-center gap-2 bg-brand-green text-white py-4 font-bold text-xs uppercase tracking-[0.2em] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? (
          <><Loader2 size={15} className="animate-spin" /> Booking...</>
        ) : (
          <><Calendar size={15} /> Book Consultation</>
        )}
      </button>
    </form>
  );
}
