import { Router } from "express";
import { listUsers } from "./user.controller"; 
import { validate } from "../../lib/validation-middleware";
import { QueryListUserDTO } from "./user.dto";
import { isReferente } from "../../lib/auth/roles.middleware";

const router = Router();

router.get('/', isReferente, validate(QueryListUserDTO, 'query'), listUsers); 

export default router;