import httpStatus from "http-status"
import AppError from "../../errors/AppError"
import QueryBuilder from "../../builder/QueryBuilder"
import type { TEducation } from "./education.interface"
import { Education } from "./education.model"

const EducationSearchableFields = ["institution", "degree", "description"]

const createEducationIntoDB = async (educationData: TEducation) => {
  const result = await Education.create(educationData)
  return result
}

const getAllEducationFromDB = async (query: Record<string, unknown>) => {
  const educationQuery = new QueryBuilder(Education.find(), query)
    .search(EducationSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await educationQuery.modelQuery
  const meta = await educationQuery.countTotal()

  return {
    meta,
    result,
  }
}

const getSingleEducationFromDB = async (id: string) => {
  const result = await Education.findById(id)
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Education record not found")
  }
  return result
}

const updateEducationIntoDB = async (id: string, payload: Partial<TEducation>) => {
  const result = await Education.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Education record not found")
  }

  return result
}

const deleteEducationFromDB = async (id: string) => {
  const result = await Education.findByIdAndDelete(id)
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Education record not found")
  }
  return result
}

export const EducationServices = {
  createEducationIntoDB,
  getAllEducationFromDB,
  getSingleEducationFromDB,
  updateEducationIntoDB,
  deleteEducationFromDB,
}
