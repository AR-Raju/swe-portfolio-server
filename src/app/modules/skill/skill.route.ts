import express from "express"
import auth from "../../middlewares/auth"
import validateRequest from "../../middlewares/validateRequest"
import { USER_ROLE } from "../user/user.constant"
import { SkillControllers } from "./skill.controller"
import { SkillValidation } from "./skill.validation"

const router = express.Router()

router.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequest(SkillValidation.createSkillValidationSchema),
  SkillControllers.createSkill,
)

router.get("/", SkillControllers.getAllSkills)

router.get("/:id", SkillControllers.getSingleSkill)

router.put(
  "/:id",
  auth(USER_ROLE.admin),
  validateRequest(SkillValidation.updateSkillValidationSchema),
  SkillControllers.updateSkill,
)

router.delete("/:id", auth(USER_ROLE.admin), SkillControllers.deleteSkill)

export const SkillRoutes = router
