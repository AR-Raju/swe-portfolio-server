import express from "express"
import auth from "../../middlewares/auth"
import validateRequest from "../../middlewares/validateRequest"
import { USER_ROLE } from "../user/user.constant"
import { EducationControllers } from "./education.controller"
import { EducationValidation } from "./education.validation"

const router = express.Router()

router.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequest(EducationValidation.createEducationValidationSchema),
  EducationControllers.createEducation,
)

router.get("/", EducationControllers.getAllEducation)

router.get("/:id", EducationControllers.getSingleEducation)

router.put(
  "/:id",
  auth(USER_ROLE.admin),
  validateRequest(EducationValidation.updateEducationValidationSchema),
  EducationControllers.updateEducation,
)

router.delete("/:id", auth(USER_ROLE.admin), EducationControllers.deleteEducation)

export const EducationRoutes = router
