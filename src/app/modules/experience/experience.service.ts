import httpStatus from "http-status"
import AppError from "../../errors/AppError"
import QueryBuilder from "../../builder/QueryBuilder"
import type { TExperience } from "./experience.interface"
import { Experience } from "./experience.model"

const ExperienceSearchableFields = ["company", "position", "description"]

const createExperienceIntoDB = async (experienceData: TExperience) => {
  const result = await Experience.create(experienceData)
  return result
}

const getAllExperienceFromDB = async (query: Record<string, unknown>) => {
  const experienceQuery = new QueryBuilder(Experience.find(), query)
    .search(ExperienceSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await experienceQuery.modelQuery
  const meta = await experienceQuery.countTotal()

  return {
    meta,
    result,
  }
}

const getSingleExperienceFromDB = async (id: string) => {
  const result = await Experience.findById(id)
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Experience record not found")
  }
  return result
}

const updateExperienceIntoDB = async (id: string, payload: Partial<TExperience>) => {
  const result = await Experience.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Experience record not found")
  }

  return result
}

const deleteExperienceFromDB = async (id: string) => {
  const result = await Experience.findByIdAndDelete(id)
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Experience record not found")
  }
  return result
}

export const ExperienceServices = {
  createExperienceIntoDB,
  getAllExperienceFromDB,
  getSingleExperienceFromDB,
  updateExperienceIntoDB,
  deleteExperienceFromDB,
}
