import { AssegnazioniModel } from "./assegnazioni.model";
import { Assegnazioni, AssegnazioniFilters } from "./assegnazioni.entity";
import { CorsiModel } from "../corsi/corsi.model";
import { BadRequestError } from "../../errors/bad-request-error";

export class AssegnazioniService {

  /*attraverso questo metodo posso filtrare per dipendente,
  stato, categoria, corso, 

  */
  async list(filters?: AssegnazioniFilters, userId?: string, userRole?: string): Promise<Assegnazioni[]> {
    const query: any = {};

    if (userRole === 'dipendente') {
      query.dipendenteId = userId;
    } else {
      if (filters?.dipendenteId) {
        query.dipendenteId = filters.dipendenteId;
      }
    }

    if (filters?.stato) {
      query.stato = filters.stato;
    }

    if (filters?.corsoId) {
      query.corsoId = filters.corsoId;
    }

    if (filters?.categoria) {
      const corsi = await CorsiModel.find({ categoria: filters.categoria });
      const corsiIds = corsi.map(c => c._id.toString());
      query.corsoId = { $in: corsiIds };
    }

    return await AssegnazioniModel.find(query).sort({ createdAt: -1 });
  }

  async get(id: string): Promise<Assegnazioni | null> {
    return await AssegnazioniModel.findById(id);
  }

  /*questo metodo trova il corso tramite id, controlla se esiste, controlla se è attivo,
    e controlla se la data di scadenza è posta dopo la data di assegnazione, se tutto è positivo crea l'assegnazione
  */
  async create(data: Partial<Assegnazioni>): Promise<Assegnazioni> {
    const corso = await CorsiModel.findById(data.corsoId);
    if (!corso) {
      throw new BadRequestError("Corso non trovato");
    }
    if (!corso.attivo) {
      throw new BadRequestError("Impossibile assegnare: il corso non è attivo");
    }

    const existing = await AssegnazioniModel.findOne({
      corsoId: data.corsoId,
      dipendenteId: data.dipendenteId,
      stato: 'assegnato'
    });
    if (existing) {
      throw new BadRequestError("Il corso è già stato assegnato a questo dipendente");
    }

    if (data.dataAssegnazione && data.dataScadenza) {
      if (new Date(data.dataScadenza) < new Date(data.dataAssegnazione)) {
        throw new BadRequestError("La data di scadenza non può essere precedente alla data di assegnazione");
      }
    }

    return await AssegnazioniModel.create(data);
  }


  /*trovo l'assegnazione tramite id, se cambio la data di scadenza o di assegnazione 
  controllo se la data di scadenza è sempre superiore alla data di assegnazione,se non vengono lanciati errori esegue l'update

  */
  async update(id: string, data: Partial<Assegnazioni>): Promise<Assegnazioni | null> {
    const existing = await AssegnazioniModel.findById(id);
    if (!existing) return null;

    const assignmentDate = data.dataAssegnazione || existing.dataAssegnazione;

    if (data.dataScadenza && new Date(data.dataScadenza) < new Date(assignmentDate)) {
      throw new BadRequestError("La data di scadenza non può essere precedente alla data di assegnazione");
    }

    if (data.dataCompletamento && new Date(data.dataCompletamento) < new Date(assignmentDate)) {
      throw new BadRequestError("La data di completamento non può essere precedente alla data di assegnazione");
    }

    return await AssegnazioniModel.findByIdAndUpdate(id, data, { new: true });
  }


  /*trovo l'assegnazione tramite id, se esiste controllo se mi è stato asseganto e se è in stato assegnato,
  se non vengono lanciati errori setto lo stato a completato, viene valorizzato il campo dataCompletamento

  */
  async completa(id: string, userId: string): Promise<Assegnazioni | null> {
    const assignment = await AssegnazioniModel.findById(id);
    if (!assignment) return null;

    if (assignment.dipendenteId !== userId) {
      throw new BadRequestError("Non puoi completare un corso che non ti è stato assegnato");
    }

    if (assignment.stato !== 'assegnato') {
      throw new BadRequestError("Solo i corsi in stato 'assegnato' possono essere completati");
    }

    assignment.stato = 'completato' as any;
    assignment.dataCompletamento = new Date();
    return await assignment.save();
  }


  //trovo l'asseganzione tramite id, se esiste controllo che non sia a completato o annullato perchè 
  // se è già in quei due stati non ha senso annullare ancora
  async annulla(id: string): Promise<Assegnazioni | null> {
    const assignment = await AssegnazioniModel.findById(id);
    if (!assignment) return null;

    if (assignment.stato === 'completato' || assignment.stato === 'annullato') {
      throw new BadRequestError("Impossibile annullare: l'assegnazione è già in stato terminale");
    }

    assignment.stato = 'annullato' as any;
    return await assignment.save();
  }

   //trovo l'asseganzione tramite id, se esiste controllo che sia assegnato
   // in quanto se fosse completato o annullato cancellerei una sorta di storico
  async remove(id: string): Promise<Assegnazioni | null> {
    const assignment = await AssegnazioniModel.findById(id);
    if (!assignment) return null;

    if (assignment.stato !== 'assegnato') {
      throw new BadRequestError("Impossibile eliminare: solo le assegnazioni in stato 'assegnato' possono essere eliminate");
    }

    return await AssegnazioniModel.findByIdAndDelete(id);
  }
}

export default new AssegnazioniService();