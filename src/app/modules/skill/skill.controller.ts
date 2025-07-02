import httpStatus from "http-status"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { SkillServices } from "./skill.service"

const createSkill = catchAsync(async (req, res) => {
  const result = await SkillServices.createSkillIntoDB(req.body)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Skill created successfully",
    data: result,
  })
})

const getAllSkills = catchAsync(async (req, res) => {
  const result = await SkillServices.getAllSkillsFromDB(req.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Skills retrieved successfully",
    data: result.result,
    pagination: result.meta,
  })
})

const getSingleSkill = catchAsync(async (req, res) => {
  const { id } = req.params
  if (!id) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: "Skill id is required",
      data: null,
    })
  }
  const result = await SkillServices.getSingleSkillFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Skill retrieved successfully",
    data: result,
  })
})

const updateSkill = catchAsync(async (req, res) => {
  const { id } = req.params
  if (!id) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: "Skill id is required",
      data: null,
    })
  }
  const result = await SkillServices.updateSkillIntoDB(id, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Skill updated successfully",
    data: result,
  })
})

const deleteSkill = catchAsync(async (req, res) => {
  const { id } = req.params
  if (!id) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: "Skill id is required",
      data: null,
    })
  }
  const result = await SkillServices.deleteSkillFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Skill deleted successfully",
    data: result,
  })
})

export const SkillControllers = {
  createSkill,
  getAllSkills,
  getSingleSkill,
  updateSkill,
  deleteSkill,
}
