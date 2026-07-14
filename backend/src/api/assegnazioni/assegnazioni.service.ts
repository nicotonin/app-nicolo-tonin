import { AssegnazioniModel } from "./assegnazioni.model";
import { Assegnazioni } from "./assegnazioni.entity";
import { CorsiModel } from "../corsi/corsi.model";

export class AssegnazioniService {

  //LISTA DI TUTTE LE ASSEGNAZIONI CON I FILTRI
  async list(): Promise<Assegnazioni[]> {
    return await AssegnazioniModel.find();
  }
  //TROVA LE ASSEGNAZIONI TRAMITE ID
  async get(id: string): Promise<Assegnazioni | null> {
    return await AssegnazioniModel.findById(id);
  }

  // TROVA TUTTE LE ASSEGNAZIONI DI UN UTENTE SPECIFICO ORDINATE PER DATA DI CREAZIONE DECRESCENTE
  async getAssegnazioniByUser(userId: string) {
    return await AssegnazioniModel.find({ dipendenteId: userId }).sort({ createdAt: -1 }).exec();
  }

  async create(data: Partial<Assegnazioni>): Promise<Assegnazioni> {
    return await AssegnazioniModel.create(data);
  }

  async update(id: string, data: Partial<Assegnazioni>): Promise<Assegnazioni | null> {
    return await AssegnazioniModel.findByIdAndUpdate(id, data, { new: true });
  }

  async remove(id: string): Promise<Assegnazioni | null> {
    return await AssegnazioniModel.findByIdAndDelete(id);
  }
}

export default new AssegnazioniService();