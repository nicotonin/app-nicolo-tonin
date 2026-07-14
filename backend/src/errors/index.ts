import { notFoundHandler } from "./not-found-error";
import { genericHandler } from './generic';
import { validationHandler } from "./validation";
import { badRequestHandler } from "./bad-request-error";


export const errorHandlers = [validationHandler, badRequestHandler, notFoundHandler, genericHandler];