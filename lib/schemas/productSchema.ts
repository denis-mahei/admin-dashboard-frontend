import { z } from "zod";
import { Categories } from "@/lib/types/definitions";

export const productSchema = z.object({
  name: z
    .string({ message: "Product info must be a string" })
    .min(3, "Product name must at least 3 characters")
    .trim(),
  stock: z.coerce.number().min(1),
  price: z.coerce.number().min(0.01).positive(),
  supplierId: z.coerce.number(),
  category: z.enum(Categories),
});

export type ProductValues = z.infer<typeof productSchema>;
