import express from "express"
import auth from "../../middlewares/auth"
import validateRequest from "../../middlewares/validateRequest"
import { USER_ROLE } from "../user/user.constant"
import { ProjectControllers } from "./project.controller"
import { ProjectValidation } from "./project.validation"

const router = express.Router()

router.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequest(ProjectValidation.createProjectValidationSchema),
  ProjectControllers.createProject,
)

router.get("/", ProjectControllers.getAllProjects)

router.get("/:id", ProjectControllers.getSingleProject)

router.put(
  "/:id",
  auth(USER_ROLE.admin),
  validateRequest(ProjectValidation.updateProjectValidationSchema),
  ProjectControllers.updateProject,
)

router.delete("/:id", auth(USER_ROLE.admin), ProjectControllers.deleteProject)

export const ProjectRoutes = router
