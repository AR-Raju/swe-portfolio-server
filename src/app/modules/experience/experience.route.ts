import express from "express"
import auth from "../../middlewares/auth"
import validateRequest from "../../middlewares/validateRequest"
import { USER_ROLE } from "../user/user.constant"
import { ExperienceControllers } from "./experience.controller"
import { ExperienceValidation } from "./experience.validation"

const router = express.Router()

router.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequest(ExperienceValidation.createExperienceValidationSchema),
  ExperienceControllers.createExperience,
)

router.get("/", ExperienceControllers.getAllExperience)

router.get("/:id", ExperienceControllers.getSingleExperience)

router.put(
  "/:id",
  auth(USER_ROLE.admin),
  validateRequest(ExperienceValidation.updateExperienceValidationSchema),
  ExperienceControllers.updateExperience,
)

router.delete("/:id", auth(USER_ROLE.admin), ExperienceControllers.deleteExperience)

export const ExperienceRoutes = router
