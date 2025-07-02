import httpStatus from "http-status"
import AppError from "../../errors/AppError"
import QueryBuilder from "../../builder/QueryBuilder"
import type { TProject } from "./project.interface"
import { Project } from "./project.model"

const ProjectSearchableFields = ["name", "shortDescription", "detailedDescription"]

const createProjectIntoDB = async (projectData: TProject) => {
  const result = await Project.create(projectData)
  return result
}

const getAllProjectsFromDB = async (query: Record<string, unknown>) => {
  const projectQuery = new QueryBuilder(Project.find(), query)
    .search(ProjectSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await projectQuery.modelQuery
  const meta = await projectQuery.countTotal()

  return {
    meta,
    result,
  }
}

const getSingleProjectFromDB = async (id: string) => {
  const result = await Project.findById(id)
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Project not found")
  }
  return result
}

const updateProjectIntoDB = async (id: string, payload: Partial<TProject>) => {
  const result = await Project.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Project not found")
  }

  return result
}

const deleteProjectFromDB = async (id: string) => {
  const result = await Project.findByIdAndDelete(id)
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Project not found")
  }
  return result
}

export const ProjectServices = {
  createProjectIntoDB,
  getAllProjectsFromDB,
  getSingleProjectFromDB,
  updateProjectIntoDB,
  deleteProjectFromDB,
}
