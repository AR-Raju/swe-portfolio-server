import httpStatus from "http-status"
import AppError from "../../errors/AppError"
import QueryBuilder from "../../builder/QueryBuilder"
import type { TSkill } from "./skill.interface"
import { Skill } from "./skill.model"

const SkillSearchableFields = ["name", "category"]

const createSkillIntoDB = async (skillData: TSkill) => {
  const result = await Skill.create(skillData)
  return result
}

const getAllSkillsFromDB = async (query: Record<string, unknown>) => {
  const skillQuery = new QueryBuilder(Skill.find(), query)
    .search(SkillSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await skillQuery.modelQuery
  const meta = await skillQuery.countTotal()

  return {
    meta,
    result,
  }
}

const getSingleSkillFromDB = async (id: string) => {
  const result = await Skill.findById(id)
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Skill not found")
  }
  return result
}

const updateSkillIntoDB = async (id: string, payload: Partial<TSkill>) => {
  const result = await Skill.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Skill not found")
  }

  return result
}

const deleteSkillFromDB = async (id: string) => {
  const result = await Skill.findByIdAndDelete(id)
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Skill not found")
  }
  return result
}

export const SkillServices = {
  createSkillIntoDB,
  getAllSkillsFromDB,
  getSingleSkillFromDB,
  updateSkillIntoDB,
  deleteSkillFromDB,
}
