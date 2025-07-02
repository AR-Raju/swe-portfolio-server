import httpStatus from "http-status"
import nodemailer from "nodemailer"
import AppError from "../../errors/AppError"
import QueryBuilder from "../../builder/QueryBuilder"
import type { TContactMessage, TContactSettings } from "./contact.interface"
import { ContactMessage, ContactSettings } from "./contact.model"

const ContactMessageSearchableFields = ["name", "email", "subject", "message"]

// Email transporter configuration
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

const getContactSettingsFromDB = async () => {
  let settings = await ContactSettings.findOne()

  if (!settings) {
    // Create default settings if none exist
    settings = await ContactSettings.create({
      phone: "+1234567890",
      email: "contact@example.com",
    })
  }

  return settings
}

const updateContactSettingsIntoDB = async (payload: Partial<TContactSettings>) => {
  let settings = await ContactSettings.findOne()

  if (!settings) {
    // Create new settings if none exist
    settings = await ContactSettings.create(payload)
  } else {
    // Update existing settings
    settings = await ContactSettings.findByIdAndUpdate(settings._id, payload, {
      new: true,
      runValidators: true,
    })
  }

  if (!settings) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to update contact settings")
  }

  return settings
}

const createContactMessageIntoDB = async (messageData: TContactMessage) => {
  // Save message to database
  const message = await ContactMessage.create(messageData)

  // Send email notification
  try {
    const transporter = createTransporter()
    const contactSettings = await getContactSettingsFromDB()

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: contactSettings.email,
      subject: `New Contact Message: ${messageData.subject || "No Subject"}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${messageData.name}</p>
        <p><strong>Email:</strong> ${messageData.email}</p>
        <p><strong>Subject:</strong> ${messageData.subject || "No Subject"}</p>
        <p><strong>Message:</strong></p>
        <p>${messageData.message.replace(/\n/g, "<br>")}</p>
        <p><strong>Received:</strong> ${new Date().toLocaleString()}</p>
      `,
    }

    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.error("Failed to send email notification:", error)
    // Don't throw error here as message is already saved
  }

  return message
}

const getAllContactMessagesFromDB = async (query: Record<string, unknown>) => {
  const messageQuery = new QueryBuilder(ContactMessage.find(), query)
    .search(ContactMessageSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await messageQuery.modelQuery
  const meta = await messageQuery.countTotal()

  return {
    meta,
    result,
  }
}

const getSingleContactMessageFromDB = async (id: string) => {
  const result = await ContactMessage.findById(id)
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Contact message not found")
  }
  return result
}

const updateContactMessageIntoDB = async (id: string, payload: Partial<TContactMessage>) => {
  const result = await ContactMessage.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Contact message not found")
  }

  return result
}

const deleteContactMessageFromDB = async (id: string) => {
  const result = await ContactMessage.findByIdAndDelete(id)
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Contact message not found")
  }
  return result
}

export const ContactServices = {
  getContactSettingsFromDB,
  updateContactSettingsIntoDB,
  createContactMessageIntoDB,
  getAllContactMessagesFromDB,
  getSingleContactMessageFromDB,
  updateContactMessageIntoDB,
  deleteContactMessageFromDB,
}
