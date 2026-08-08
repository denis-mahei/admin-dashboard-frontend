import { z } from "zod";

export const productSchema = z.object({
  name: z.string(),
  stock: z.coerce.number(),
  price: z.coerce.number(),
  supplier: z.string(),
  category: z.string(),
});

export type ProductValues = z.infer<typeof productSchema>;
