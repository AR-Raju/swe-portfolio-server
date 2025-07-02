import express from "express"
import rateLimit from "express-rate-limit"
import auth from "../../middlewares/auth"
import validateRequest from "../../middlewares/validateRequest"
import { USER_ROLE } from "../user/user.constant"
import { ContactControllers } from "./contact.controller"
import { ContactValidation } from "./contact.validation"

const router = express.Router()

// Rate limiting for contact form submissions
const contactFormLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // limit each IP to 3 contact form submissions per windowMs
  message: {
    success: false,
    message: "Too many contact form submissions, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
})

// Contact Settings Routes
router.get("/settings", ContactControllers.getContactSettings)

router.put(
  "/settings",
  auth(USER_ROLE.admin),
  validateRequest(ContactValidation.updateContactSettingsValidationSchema),
  ContactControllers.updateContactSettings,
)

// Contact Message Routes
router.post(
  "/message",
  contactFormLimiter,
  validateRequest(ContactValidation.createContactMessageValidationSchema),
  ContactControllers.createContactMessage,
)

router.get("/messages", auth(USER_ROLE.admin), ContactControllers.getAllContactMessages)

router.get("/messages/:id", auth(USER_ROLE.admin), ContactControllers.getSingleContactMessage)

router.put(
  "/messages/:id",
  auth(USER_ROLE.admin),
  validateRequest(ContactValidation.updateContactMessageValidationSchema),
  ContactControllers.updateContactMessage,
)

router.delete("/messages/:id", auth(USER_ROLE.admin), ContactControllers.deleteContactMessage)

export const ContactRoutes = router
