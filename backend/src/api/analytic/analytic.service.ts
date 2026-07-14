import { AnalyticModel } from "./analytic.model";
import { Analytic } from "./analytic.entity";

export class AnalyticService {

  async list(): Promise<Analytic[]> {
    return await AnalyticModel.find();
  }

  async get(id: string): Promise<Analytic | null> {
    return await AnalyticModel.findById(id);
  }

}

export default new AnalyticService();