import { model, Schema } from "mongoose";

const assegnazioniSchema = new Schema(
  {
    corsoId: { type: String, required: true },
    dipendenteId: { type: String, required: true },
    dataAssegnazione: { type: Date, required: true },
    dataScadenza: { type: Date, required: true },
    stato: { type: String, required: true, enum: ['assegnato', 'completato', 'scaduto', 'annullato'] },
    dataCompletamento: { type: Date, required: false },
  },
  { timestamps: true }
);

assegnazioniSchema.set("toJSON", {
  virtuals: true,
  transform: (_, ret) => {
    delete (ret as unknown as any)._id;
    delete (ret as unknown as any).__v;
    return ret;
  }
});

assegnazioniSchema.set("toObject", {
  virtuals: true,
  transform: (_, ret) => {
    delete (ret as unknown as any)._id;
    delete (ret as unknown as any).__v;
    return ret;
  }
});

export const AssegnazioniModel = model("Assegnazioni", assegnazioniSchema);