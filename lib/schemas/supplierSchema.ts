import { z } from "zod";
import { STATUS } from "@/lib/types/definitions";
import dayjs, { Dayjs } from "dayjs";

export const supplierSchema = z.object({
  name: z.string().trim(),
  address: z.string().trim(),
  company: z.string().trim(),
  date: z
    .custom<Dayjs>(
      (val) => dayjs.isDayjs(val) && val.isValid(),
      "Delivery date is required",
    )
    .transform((val) => val.toDate()),
  amount: z.coerce.number(),
  status: z.enum(STATUS),
});

export type SupplierValues = z.input<typeof supplierSchema>;
export type SupplierPayload = z.output<typeof supplierSchema>;
