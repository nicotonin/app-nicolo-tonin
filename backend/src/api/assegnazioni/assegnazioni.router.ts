import { Router } from "express";
import { list, get, create, update, remove, completa, annulla } from "./assegnazioni.controller";
import { AddAssegnazioniDTO, UpdateAssegnazioniDTO, QueryListAssegnazioniDTO } from "./assegnazioni.dto";
import { validate } from "../../lib/validation-middleware";
import { isReferente } from "../../lib/auth/roles.middleware";

const router = Router();

router.get("/", validate(QueryListAssegnazioniDTO, 'query'), list);
router.get("/:id", get);
router.post("/", isReferente, validate(AddAssegnazioniDTO), create);
router.put("/:id", isReferente, validate(UpdateAssegnazioniDTO), update);
router.put("/:id/completa", completa);
router.put("/:id/annulla", isReferente, annulla);
router.delete("/:id", isReferente, remove);

export default router;