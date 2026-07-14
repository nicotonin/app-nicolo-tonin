import { Router } from "express";
import { list, get } from "./analytic.controller";
import { AddAnalyticDTO, UpdateAnalyticDTO } from "./analytic.dto";
import { validate } from "../../lib/validation-middleware";

const router = Router();

router.get("/", list);
router.get("/:id", get);

export default router;