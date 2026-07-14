import { Response, NextFunction } from "express";
import CorsiService from "./corsi.service";
import { TypedRequest } from "../../lib/typed-request.interface";
import { AddCorsiDTO, UpdateCorsiDTO, QueryListCorsiDTO } from "./corsi.dto";
import { Corsi } from "./corsi.entity";
import { NotFoundError } from "../../errors/not-found-error";

// prendo la request con i filtri creo la query e mi resituisce il json della lista risultante
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

//l'oggetto item se contiene una request contente un id valido mi ritorna un json con ilcorso
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

//prendo il body della request contente i dati della creazione e se va a buon fine me lo crea restutuiendo 201
export const create = async (
  req: TypedRequest<AddCorsiDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(201).json(await CorsiService.create(req.body as unknown as Partial<Corsi>));
  } catch (err) {
    next(err);
  }
};


//se il body e l'id della request sono validi viene fatto l'update del corso e restituito il json oppure vien elanciato un errore se non sono validi
export const update = async (
  req: TypedRequest<UpdateCorsiDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const item = await CorsiService.update(req.params.id, req.body as unknown as Partial<Corsi>);
    if (!item) throw new NotFoundError();
    res.json(item);
  } catch (err) {
    next(err);
  }
};


//se l'id della req è valido viene eseguito il metodo remove se no viene lanciato un errore
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

//se l'id della req è valido viene eseguito il metodo disattiva e resituito il json altrimenti viene lanciato un errore
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