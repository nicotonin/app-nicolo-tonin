import { model, Schema } from "mongoose";

const analyticSchema = new Schema(
  {
    name: { type: String, required: true }
  },
  { timestamps: true }
);

analyticSchema.set("toJSON", {
  virtuals: true,
  transform: (_, ret) => {
    delete (ret as unknown as any)._id;
    delete (ret as unknown as any).__v;
    return ret;
  }
});

analyticSchema.set("toObject", {
  virtuals: true,
  transform: (_, ret) => {
    delete (ret as unknown as any)._id;
    delete (ret as unknown as any).__v;
    return ret;
  }
});

export const AnalyticModel = model("Analytic", analyticSchema);