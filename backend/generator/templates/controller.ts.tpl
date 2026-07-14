import { Response, NextFunction } from "express";
import {{Name}}Service from "./{{name}}.service";
import { TypedRequest } from "../../lib/typed-request.interface";
import { Add{{Name}}DTO, Update{{Name}}DTO } from "./{{name}}.dto";
import { NotFoundError } from "../../errors/not-found-error";

export const list = async (
  req: TypedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await {{Name}}Service.list());
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
    const item = await {{Name}}Service.get(req.params.id);
    if (!item) throw new NotFoundError();
    res.json(item);
  } catch (err) {
    next(err);
  }
};

export const create = async (
  req: TypedRequest<Add{{Name}}DTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(201).json(await {{Name}}Service.create(req.body));
  } catch (err) {
    next(err);
  }
};

export const update = async (
  req: TypedRequest<Update{{Name}}DTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const item = await {{Name}}Service.update(req.params.id, req.body);
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
    const item = await {{Name}}Service.remove(req.params.id);
    if (!item) throw new NotFoundError();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};