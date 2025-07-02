import { Schema, model } from "mongoose"
import type { TProfile } from "./profile.interface"

const profileSchema = new Schema<TProfile>(
  {
    designation: {
      type: String,
      required: [true, "Designation is required"],
      trim: true,
      maxlength: [100, "Designation cannot exceed 100 characters"],
    },
    introduction: {
      type: String,
      required: [true, "Introduction is required"],
      trim: true,
      maxlength: [2000, "Introduction cannot exceed 2000 characters"],
    },
    resumeUrl: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
)

export const Profile = model<TProfile>("Profile", profileSchema)
