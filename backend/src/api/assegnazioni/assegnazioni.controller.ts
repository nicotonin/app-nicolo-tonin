import { Response, NextFunction } from "express";
import AssegnazioniService from "./assegnazioni.service";
import { TypedRequest } from "../../lib/typed-request.interface";
import { AddAssegnazioniDTO, UpdateAssegnazioniDTO } from "./assegnazioni.dto";
import { NotFoundError } from "../../errors/not-found-error";

export const list = async (
  req: TypedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await AssegnazioniService.list());
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
    res.status(201).json(await AssegnazioniService.create(req.body));
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
    const item = await AssegnazioniService.update(req.params.id, req.body);
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