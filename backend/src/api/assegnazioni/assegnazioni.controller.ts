import { Response, NextFunction } from "express";
import AssegnazioniService from "./assegnazioni.service";
import { TypedRequest } from "../../lib/typed-request.interface";
import { AddAssegnazioniDTO, UpdateAssegnazioniDTO, QueryListAssegnazioniDTO } from "./assegnazioni.dto";
import { Assegnazioni, AssegnazioniFilters, StatoAssegnazione } from "./assegnazioni.entity";
import { NotFoundError } from "../../errors/not-found-error";

export const list = async (
  req: TypedRequest<any, QueryListAssegnazioniDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as any;
    const filters: AssegnazioniFilters = {
      stato: req.query.stato as StatoAssegnazione | undefined,
      categoria: req.query.categoria,
      corsoId: req.query.corsoId,
      dipendenteId: req.query.dipendenteId,
    };
    const items = await AssegnazioniService.list(filters, user?.id, user?.role);
    res.json(items);
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
    const item = await AssegnazioniService.get(req.params.id);
    if (!item) throw new NotFoundError();
    const user = req.user as any;
    if (user?.role === 'dipendente' && item.dipendenteId !== user.id) {
      throw new NotFoundError();
    }
    res.json(item);
  } catch (err) {
    next(err);
  }
};

export const create = async (
  req: TypedRequest<AddAssegnazioniDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(201).json(await AssegnazioniService.create(req.body as unknown as Partial<Assegnazioni>));
  } catch (err) {
    next(err);
  }
};

export const update = async (
  req: TypedRequest<UpdateAssegnazioniDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const item = await AssegnazioniService.update(req.params.id, req.body as unknown as Partial<Assegnazioni>);
    if (!item) throw new NotFoundError();
    res.json(item);
  } catch (err) {
    next(err);
  }
};

export const completa = async (
  req: TypedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as any;
    const item = await AssegnazioniService.completa(req.params.id, user.id);
    if (!item) throw new NotFoundError();
    res.json(item);
  } catch (err) {
    next(err);
  }
};

export const annulla = async (
  req: TypedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const item = await AssegnazioniService.annulla(req.params.id);
    if (!item) throw new NotFoundError();
    res.json(item);
  } catch (err) {
    next(err);
  }
};

export const remove = async (
  req: TypedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const item = await AssegnazioniService.remove(req.params.id);
    if (!item) throw new NotFoundError();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};