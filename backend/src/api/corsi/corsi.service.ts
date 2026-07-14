import { CorsiModel } from "./corsi.model";
import { Corsi, CorsiFilters } from "./corsi.entity";
import { AssegnazioniModel } from "../assegnazioni/assegnazioni.model";
import { BadRequestError } from "../../errors/bad-request-error";

export class CorsiService {

  //questo metodo mi da la lista dei corsi filtrabile per la categoria e/o lo stato attivo
  async list(filters?: CorsiFilters): Promise<Corsi[]> {
    const query: any = {};
    if (filters?.categoria) {
      query.categoria = filters.categoria;
    }
    if (filters?.attivo !== undefined) {
      query.attivo = filters.attivo;
    }
    return await CorsiModel.find(query);
  }

  //questo metodo mi ritorna un corso tramite il suo id
  async get(id: string): Promise<Corsi | null> {
    return await CorsiModel.findById(id);
  }

  //questo metodo mi permette di creare un corso
  async create(data: Partial<Corsi>): Promise<Corsi> {
    return await CorsiModel.create(data);
  }


  //questo metodo mi permette di aggiornare un corso tramite id
  async update(id: string, data: Partial<Corsi>): Promise<Corsi | null> {
    return await CorsiModel.findByIdAndUpdate(id, data, { new: true });
  }

  //questo metodo iinvece mi permette di rimuovere un corso torvandolo prima per id e poi nel caso in cui sia assegnato mi blocca l'eliminazione
  
  async remove(id: string): Promise<Corsi | null> {
    const hasAssignments = await AssegnazioniModel.findOne({ corsoId: id });
    if (hasAssignments) {
      throw new BadRequestError("Impossibile eliminare: il corso ha assegnazioni collegate");
    }
    return await CorsiModel.findByIdAndDelete(id);
  }

//questo invece mi permette di dissativare un corso trovandolo per id e settando a false lo stato attivo
  async disattiva(id: string): Promise<Corsi | null> {
    return await CorsiModel.findByIdAndUpdate(id, { attivo: false }, { new: true });
  }
}

export default new CorsiService();