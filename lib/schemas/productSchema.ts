import { z } from "zod";
import { Categories } from "@/lib/types/definitions";

export const productSchema = z.object({
  name: z.string(),
  stock: z.coerce.number(),
  price: z.coerce.number(),
  supplierId: z.coerce.number(),
  category: z.enum(Categories),
});

export type ProductValues = z.infer<typeof productSchema>;
