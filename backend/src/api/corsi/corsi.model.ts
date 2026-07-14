import { model, Schema } from "mongoose";

const corsiSchema = new Schema(
  {
    titolo: { type: String, required: true },
    descrizione: { type: String, required: true },
    categoria: { type: String, required: true, enum: ['Sicurezza', 'Informatica', 'Lingue', 'Management', 'Compliance', 'Soft Skills', 'Tecnico-Professionale', 'Qualità'] },
    durata: { type: Number, required: true },
    obbligatorio: { type: Boolean, required: true },
    attivo: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

corsiSchema.set("toJSON", {
  virtuals: true,
  transform: (_, ret) => {
    delete (ret as unknown as any)._id;
    delete (ret as unknown as any).__v;
    return ret;
  }
});

corsiSchema.set("toObject", {
  virtuals: true,
  transform: (_, ret) => {
    delete (ret as unknown as any)._id;
    delete (ret as unknown as any).__v;
    return ret;
  }
});

export const CorsiModel = model("Corsi", corsiSchema);