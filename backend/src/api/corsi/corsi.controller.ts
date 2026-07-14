import { Response, NextFunction } from "express";
import CorsiService from "./corsi.service";
import { TypedRequest } from "../../lib/typed-request.interface";
import { AddCorsiDTO, UpdateCorsiDTO, QueryListCorsiDTO } from "./corsi.dto";
import { NotFoundError } from "../../errors/not-found-error";

export const list = async (
  req: TypedRequest<any, any, QueryListCorsiDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const filters = {
      categoria: req.query.categoria,
      attivo: req.query.attivo !== undefined ? req.query.attivo === 'true' : undefined,
    };
    res.json(await CorsiService.list(filters));
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
    const item = await CorsiService.get(req.params.id);
    if (!item) throw new NotFoundError();
    res.json(item);
  } catch (err) {
    next(err);
  }
};

export const create = async (
  req: TypedRequest<AddCorsiDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(201).json(await CorsiService.create(req.body));
  } catch (err) {
    next(err);
  }
};

export const update = async (
  req: TypedRequest<UpdateCorsiDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const item = await CorsiService.update(req.params.id, req.body);
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
    const item = await CorsiService.remove(req.params.id);
    if (!item) throw new NotFoundError();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export const disattiva = async (
  req: TypedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const item = await CorsiService.disattiva(req.params.id);
    if (!item) throw new NotFoundError();
    res.json(item);
  } catch (err) {
    next(err);
  }
};