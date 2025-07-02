import httpStatus from "http-status"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { ContactServices } from "./contact.service"

const getContactSettings = catchAsync(async (req, res) => {
  const result = await ContactServices.getContactSettingsFromDB()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Contact settings retrieved successfully",
    data: result,
  })
})

const updateContactSettings = catchAsync(async (req, res) => {
  const result = await ContactServices.updateContactSettingsIntoDB(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Contact settings updated successfully",
    data: result,
  })
})

const createContactMessage = catchAsync(async (req, res) => {
  const result = await ContactServices.createContactMessageIntoDB(req.body)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Message sent successfully",
    data: result,
  })
})

const getAllContactMessages = catchAsync(async (req, res) => {
  const result = await ContactServices.getAllContactMessagesFromDB(req.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Contact messages retrieved successfully",
    data: result.result,
    pagination: result.meta,
  })
})

const getSingleContactMessage = catchAsync(async (req, res) => {
  const { id } = req.params
  if (!id) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: "Message id is required",
      data: null,
    })
  }
  const result = await ContactServices.getSingleContactMessageFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Contact message retrieved successfully",
    data: result,
  })
})

const updateContactMessage = catchAsync(async (req, res) => {
  const { id } = req.params
  if (!id) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: "Message id is required",
      data: null,
    })
  }
  const result = await ContactServices.updateContactMessageIntoDB(id, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Contact message updated successfully",
    data: result,
  })
})

const deleteContactMessage = catchAsync(async (req, res) => {
  const { id } = req.params
  if (!id) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: "Message id is required",
      data: null,
    })
  }
  const result = await ContactServices.deleteContactMessageFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Contact message deleted successfully",
    data: result,
  })
})

export const ContactControllers = {
  getContactSettings,
  updateContactSettings,
  createContactMessage,
  getAllContactMessages,
  getSingleContactMessage,
  updateContactMessage,
  deleteContactMessage,
}
