import { Router } from "express"
import { AuthRoutes } from "../modules/auth/auth.route"
import { ProfileRoutes } from "../modules/profile/profile.route"
import { EducationRoutes } from "../modules/education/education.route"
import { ExperienceRoutes } from "../modules/experience/experience.route"
import { SkillRoutes } from "../modules/skill/skill.route"
import { ProjectRoutes } from "../modules/project/project.route"
import { BlogRoutes } from "../modules/blog/blog.route"
import { ContactRoutes } from "../modules/contact/contact.route"
import { UploadRoutes } from "../modules/upload/upload.route"

const router = Router()

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/profile",
    route: ProfileRoutes,
  },
  {
    path: "/education",
    route: EducationRoutes,
  },
  {
    path: "/experience",
    route: ExperienceRoutes,
  },
  {
    path: "/skills",
    route: SkillRoutes,
  },
  {
    path: "/projects",
    route: ProjectRoutes,
  },
  {
    path: "/blogs",
    route: BlogRoutes,
  },
  {
    path: "/contact",
    route: ContactRoutes,
  },
  {
    path: "/upload",
    route: UploadRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
