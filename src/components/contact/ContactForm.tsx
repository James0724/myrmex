"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

const inputCls =
  "w-full px-4 py-3 border border-gray-200 bg-white text-sm text-brand-dark placeholder:text-gray-300 outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/10 transition-all";
const labelCls = "block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2";

export default function ContactForm() {
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send message");
      setSuccess(true);
      reset();
    } catch {
      setServerError("Something went wrong. Please try again or call us directly.");
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-14 h-14 border border-brand-green/30 flex items-center justify-center mb-5">
          <CheckCircle2 size={28} className="text-brand-green" />
        </div>
        <h3 className="font-display text-2xl font-700 text-brand-darker uppercase mb-2">
          Message Sent!
        </h3>
        <p className="text-gray-500 text-sm mb-6">
          Thank you for reaching out. We&apos;ll get back to you within 24 hours.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="text-brand-green text-xs font-bold uppercase tracking-widest underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelCls}>Full Name <span className="text-red-400">*</span></label>
          <input {...register("name")} placeholder="John Kamau" className={inputCls} />
          {errors.name && <p className="text-red-500 text-xs mt-1.5">{errors.name.message}</p>}
        </div>
        <div>
          <label className={labelCls}>Email Address <span className="text-red-400">*</span></label>
          <input {...register("email")} type="email" placeholder="john@example.com" className={inputCls} />
          {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelCls}>Phone Number</label>
          <input {...register("phone")} placeholder="+254 704 184 932" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Subject <span className="text-red-400">*</span></label>
          <input {...register("subject")} placeholder="e.g. CCTV Installation Enquiry" className={inputCls} />
          {errors.subject && <p className="text-red-500 text-xs mt-1.5">{errors.subject.message}</p>}
        </div>
      </div>

      <div>
        <label className={labelCls}>Message <span className="text-red-400">*</span></label>
        <textarea
          {...register("message")}
          rows={5}
          placeholder="Tell us about your property maintenance needs..."
          className={`${inputCls} resize-none`}
        />
        {errors.message && <p className="text-red-500 text-xs mt-1.5">{errors.message.message}</p>}
      </div>

      {serverError && (
        <p className="text-red-500 text-xs bg-red-50 px-4 py-3 border border-red-100">{serverError}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-fill w-full flex items-center justify-center gap-2 bg-brand-green text-white py-4 font-bold text-xs uppercase tracking-[0.2em] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? (
          <><Loader2 size={15} className="animate-spin" /> Sending...</>
        ) : (
          <><Send size={15} /> Send Message</>
        )}
      </button>
    </form>
  );
}
