import { Schema, model } from "mongoose"
import type { TSkill } from "./skill.interface"

const skillSchema = new Schema<TSkill>(
  {
    name: {
      type: String,
      required: [true, "Skill name is required"],
      trim: true,
      maxlength: [50, "Skill name cannot exceed 50 characters"],
    },
    level: {
      type: String,
      required: [true, "Skill level is required"],
      enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
    },
    category: {
      type: String,
      trim: true,
      maxlength: [50, "Category cannot exceed 50 characters"],
    },
  },
  {
    timestamps: true,
  },
)

// Indexes
skillSchema.index({ name: 1 })
skillSchema.index({ category: 1 })
skillSchema.index({ level: 1 })

export const Skill = model<TSkill>("Skill", skillSchema)
