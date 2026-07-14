import { Router } from "express";
import { list, get, create, update, remove } from "./assegnazioni.controller";
import { AddAssegnazioniDTO, UpdateAssegnazioniDTO } from "./assegnazioni.dto";
import { validate } from "../../lib/validation-middleware";
import { isReferente } from "../../lib/auth/roles.middleware";

const router = Router();

router.get("/", list);
router.get("/:id", get);
router.get("/")
router.post("/", isReferente, validate(AddAssegnazioniDTO), create);
router.put("/:id", isReferente, validate(UpdateAssegnazioniDTO), update);
router.delete("/:id", isReferente, remove);

export default router;