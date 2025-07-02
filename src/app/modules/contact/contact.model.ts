import { Schema, model } from "mongoose";
import type { TContactMessage, TContactSettings } from "./contact.interface";

const contactSettingsSchema = new Schema<TContactSettings>(
  {
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    address: {
      type: String,
      trim: true,
    },
    socialLinks: {
      linkedin: { type: String, trim: true },
      github: { type: String, trim: true },
      twitter: { type: String, trim: true },
      facebook: { type: String, trim: true },
      instagram: { type: String, trim: true },
    },
  },
  {
    timestamps: true,
  }
);

const contactMessageSchema = new Schema<TContactMessage>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    subject: {
      type: String,
      trim: true,
      maxlength: [200, "Subject cannot exceed 200 characters"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      maxlength: [2000, "Message cannot exceed 2000 characters"],
    },
    status: {
      type: String,
      enum: ["unread", "read", "replied"],
      default: "unread",
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
contactMessageSchema.index({ status: 1 });
contactMessageSchema.index({ createdAt: -1 });

export const ContactSettings = model<TContactSettings>(
  "ContactSettings",
  contactSettingsSchema
);
export const ContactMessage = model<TContactMessage>(
  "ContactMessage",
  contactMessageSchema
);
