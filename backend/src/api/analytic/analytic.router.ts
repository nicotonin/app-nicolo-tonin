import { Router } from "express";
import { riepilogo } from "./analytic.controller";
import { QueryRiepilogoDTO } from "./analytic.dto";
import { validate } from "../../lib/validation-middleware";
import { isReferente } from "../../lib/auth/roles.middleware";

const router = Router();

router.get("/riepilogo", isReferente, validate(QueryRiepilogoDTO, 'query'), riepilogo);

export default router;