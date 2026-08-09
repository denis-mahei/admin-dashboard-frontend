import { z } from "zod";

export const productSchema = z.object({
  name: z.string(),
  stock: z.coerce.number(),
  price: z.coerce.number(),
  supplierId: z.number(),
  category: z.string(),
  photo: z.string(),
});

export type ProductValues = z.infer<typeof productSchema>;
