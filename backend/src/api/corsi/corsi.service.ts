import { CorsiModel } from "./corsi.model";
import { Corsi, CorsiFilters } from "./corsi.entity";
import { AssegnazioniModel } from "../assegnazioni/assegnazioni.model";

export class CorsiService {

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

  async get(id: string): Promise<Corsi | null> {
    return await CorsiModel.findById(id);
  }

  async create(data: Partial<Corsi>): Promise<Corsi> {
    return await CorsiModel.create(data);
  }

  async update(id: string, data: Partial<Corsi>): Promise<Corsi | null> {
    return await CorsiModel.findByIdAndUpdate(id, data, { new: true });
  }

  async remove(id: string): Promise<Corsi | null> {
    const hasAssignments = await AssegnazioniModel.findOne({ corsoId: id });
    if (hasAssignments) {
      throw new Error("Impossibile eliminare: il corso ha assegnazioni collegate");
    }
    return await CorsiModel.findByIdAndDelete(id);
  }

  async disattiva(id: string): Promise<Corsi | null> {
    return await CorsiModel.findByIdAndUpdate(id, { attivo: false }, { new: true });
  }
}

export default new CorsiService();