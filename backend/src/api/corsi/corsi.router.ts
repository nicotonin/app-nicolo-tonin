import { Router } from "express";
import { list, get, create, update, remove, disattiva } from "./corsi.controller";
import { AddCorsiDTO, UpdateCorsiDTO, QueryListCorsiDTO } from "./corsi.dto";
import { validate } from "../../lib/validation-middleware";
import { isReferente } from "../../lib/auth/roles.middleware";

const router = Router();

router.get("/", validate(QueryListCorsiDTO, 'query'), list);
router.get("/:id", get);
router.post("/", isReferente, validate(AddCorsiDTO), create);
router.put("/:id", isReferente, validate(UpdateCorsiDTO), update);
router.delete("/:id", isReferente, remove);
router.put("/:id/disattiva", isReferente, disattiva);

export default router;