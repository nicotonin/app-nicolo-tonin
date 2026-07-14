import { Response, NextFunction } from "express";
import AnalyticService from "./analytic.service";
import { TypedRequest } from "../../lib/typed-request.interface";
import { AddAnalyticDTO, UpdateAnalyticDTO } from "./analytic.dto";
import { NotFoundError } from "../../errors/not-found-error";

export const list = async (
  req: TypedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await AnalyticService.list());
  } catch (err) {
    next(err);
  }
};

export const get = async (
  req: TypedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const item = await AnalyticService.get(req.params.id);
    if (!item) throw new NotFoundError();
    res.json(item);
  } catch (err) {
    next(err);
  }
};

