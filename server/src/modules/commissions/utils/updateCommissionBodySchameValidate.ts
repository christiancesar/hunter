import { Request } from "express";
import { z } from "zod";

export function updateCommissionBodySchameValidate(body: Request) {
  const commissionBodySchema = z.object({
    id: z.string(),
    budgetShortId: z.number(),
    budgetId: z.string(),
    budgetItemId: z.string(),
    budgetItemQuantity: z
      .number()
      .min(1, { message: "Quantity must be greater than 0" }),
    budgetItemAmount: z
      .number()
      .min(1, { message: "Amount must be greater than 0" }),
    commissionPercent: z
      .number()
      .min(0.1, { message: "Percent must be greater than 0" }),
    divisionBy: z
      .number()
      .min(1, { message: "Division must be greater than 0" }),
    employeeIds: z
      .array(z.string())
      .nonempty({ message: "Employee ids must not be empty" }),
    serviceTypeCommissionId: z.string(),
    //TODO: VALIDATE IDS
  });

  return commissionBodySchema.parse(body);
}
