import { z } from "zod";

export const productSchema = z.object({
  name: z.string(),
  stock: z.string(),
  price: z.string(),
  supplier: z.string(),
});
