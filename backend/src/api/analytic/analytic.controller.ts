import { Response, NextFunction } from "express";
import AnalyticService from "./analytic.service";
import { TypedRequest } from "../../lib/typed-request.interface";
import { QueryRiepilogoDTO } from "./analytic.dto";
import { QueryStatisticheFilters } from "./analytic.entity";
import { Categoria } from "../corsi/corsi.entity";

export const riepilogo = async (
  req: TypedRequest<any, QueryRiepilogoDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const filters: QueryStatisticheFilters = {
      mese: req.query.mese,
      categoria: req.query.categoria as Categoria | undefined,
      dipendenteId: req.query.dipendenteId,
    };
    const result = await AnalyticService.riepilogo(filters);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

