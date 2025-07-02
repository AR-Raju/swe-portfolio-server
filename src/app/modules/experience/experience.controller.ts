import httpStatus from "http-status"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { ExperienceServices } from "./experience.service"

const createExperience = catchAsync(async (req, res) => {
  const result = await ExperienceServices.createExperienceIntoDB(req.body)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Experience record created successfully",
    data: result,
  })
})

const getAllExperience = catchAsync(async (req, res) => {
  const result = await ExperienceServices.getAllExperienceFromDB(req.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Experience records retrieved successfully",
    data: result.result,
    pagination: result.meta,
  })
})

const getSingleExperience = catchAsync(async (req, res) => {
  const { id } = req.params
  if (!id) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: "Experience id is required",
      data: null,
    })
  }
  const result = await ExperienceServices.getSingleExperienceFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Experience record retrieved successfully",
    data: result,
  })
})

const updateExperience = catchAsync(async (req, res) => {
  const { id } = req.params
  if (!id) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: "Experience id is required",
      data: null,
    })
  }
  const result = await ExperienceServices.updateExperienceIntoDB(id, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Experience record updated successfully",
    data: result,
  })
})

const deleteExperience = catchAsync(async (req, res) => {
  const { id } = req.params
  if (!id) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: "Experience id is required",
      data: null,
    })
  }
  const result = await ExperienceServices.deleteExperienceFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Experience record deleted successfully",
    data: result,
  })
})

export const ExperienceControllers = {
  createExperience,
  getAllExperience,
  getSingleExperience,
  updateExperience,
  deleteExperience,
}
