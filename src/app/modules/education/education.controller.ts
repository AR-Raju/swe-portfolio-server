import httpStatus from "http-status"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { EducationServices } from "./education.service"

const createEducation = catchAsync(async (req, res) => {
  const result = await EducationServices.createEducationIntoDB(req.body)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Education record created successfully",
    data: result,
  })
})

const getAllEducation = catchAsync(async (req, res) => {
  const result = await EducationServices.getAllEducationFromDB(req.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Education records retrieved successfully",
    data: result.result,
    pagination: result.meta,
  })
})

const getSingleEducation = catchAsync(async (req, res) => {
  const { id } = req.params
  if (!id) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: "Education id is required",
      data: null,
    })
  }
  const result = await EducationServices.getSingleEducationFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Education record retrieved successfully",
    data: result,
  })
})

const updateEducation = catchAsync(async (req, res) => {
  const { id } = req.params
  if (!id) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: "Education id is required",
      data: null,
    })
  }
  const result = await EducationServices.updateEducationIntoDB(id, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Education record updated successfully",
    data: result,
  })
})

const deleteEducation = catchAsync(async (req, res) => {
  const { id } = req.params
  if (!id) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: "Education id is required",
      data: null,
    })
  }
  const result = await EducationServices.deleteEducationFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Education record deleted successfully",
    data: result,
  })
})

export const EducationControllers = {
  createEducation,
  getAllEducation,
  getSingleEducation,
  updateEducation,
  deleteEducation,
}
