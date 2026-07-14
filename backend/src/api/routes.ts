import { Router } from "express";
import authRouter from "./auth/auth.router";
import userRouter from "./user/user.router";
import { isAuthenticated } from "../lib/auth/auth.middleware";
import corsiRouter from "./corsi/corsi.router";
import assegnazioniRouter from "./assegnazioni/assegnazioni.router";


const router = Router();

router.use('/auth', authRouter);

router.use(isAuthenticated);
router.use('/assegnazionis', assegnazioniRouter);
router.use('/corsis', corsiRouter);

router.use('/users', userRouter);


export default router;