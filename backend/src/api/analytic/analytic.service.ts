import { AssegnazioniModel } from "../assegnazioni/assegnazioni.model";
import { CorsiModel } from "../corsi/corsi.model";
import { StatisticaRiepilogo, QueryStatisticheFilters } from "./analytic.entity";

export class AnalyticService {

  async riepilogo(filters: QueryStatisticheFilters): Promise<StatisticaRiepilogo[]> {
    const query: any = {};

    if (filters.dipendenteId) {
      query.dipendenteId = filters.dipendenteId;
    }

    if (filters.mese) {
      const [year, month] = filters.mese.split('-');
      query.dataAssegnazione = {
        $gte: new Date(+year, +month - 1, 1),
        $lt: new Date(+year, +month, 1)
      };
    }

    const assegnazioni = await AssegnazioniModel.find(query).lean().exec();

    if (assegnazioni.length === 0) return [];

    const corsiIds = [...new Set(assegnazioni.map(a => a.corsoId))];
    const corsi = await CorsiModel.find({ _id: { $in: corsiIds } }).lean().exec();
    const mappaCorsi = Object.fromEntries(corsi.map(c => [c._id.toString(), c]));

    const gruppi: Record<string, { mese: string; categoria: string; count: number; completati: number }> = {};

    for (const a of assegnazioni) {
      const corso = mappaCorsi[a.corsoId];
      if (!corso) continue;

      if (filters.categoria && corso.categoria !== filters.categoria) continue;

      const mese = a.dataAssegnazione instanceof Date
        ? a.dataAssegnazione.toISOString().slice(0, 7)
        : String(a.dataAssegnazione).slice(0, 7);

      const key = `${mese}|${corso.categoria}`;
      if (!gruppi[key]) {
        gruppi[key] = { mese, categoria: corso.categoria, count: 0, completati: 0 };
      }
      gruppi[key].count++;
      if (a.stato === 'completato') gruppi[key].completati++;
    }

    return Object.values(gruppi)
      .map(g => ({
        mese: g.mese,
        categoria: g.categoria,
        numeroAssegnazioni: g.count,
        numeroCompletamenti: g.completati,
        percentualeCompletamento: g.count > 0
          ? Math.round((g.completati / g.count) * 10000) / 100
          : 0
      }))
      .sort((a, b) => a.mese.localeCompare(b.mese) || a.categoria.localeCompare(b.categoria));
  }
}

export default new AnalyticService();