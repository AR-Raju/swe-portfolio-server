import { Schema, model } from "mongoose"
import type { TEducation } from "./education.interface"

const educationSchema = new Schema<TEducation>(
  {
    institution: {
      type: String,
      required: [true, "Institution is required"],
      trim: true,
      maxlength: [100, "Institution name cannot exceed 100 characters"],
    },
    degree: {
      type: String,
      required: [true, "Degree is required"],
      trim: true,
      maxlength: [100, "Degree cannot exceed 100 characters"],
    },
    period: {
      type: String,
      required: [true, "Period is required"],
      trim: true,
      maxlength: [50, "Period cannot exceed 50 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
  },
  {
    timestamps: true,
  },
)

// Indexes
educationSchema.index({ createdAt: -1 })

export const Education = model<TEducation>("Education", educationSchema)
