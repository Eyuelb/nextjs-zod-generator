import { z } from "zod";

export const exampleObjectSchema = z.object({
  numbers: z.array(
    z.object({
      name: z.string(),
      age: z.number(),
      email: z.string().optional(),
      phoneNumber: z
        .string()
        .min(10)
        .refine((value) => typeof value === "string", {
          message: "phoneNumber should be a string with a minimum length of 10",
        }),
      obj: z.object({
        name: z.string(),
        age: z.number(),
        email: z.string().optional(),
        phoneNumber: z
          .string()
          .min(10)
          .refine((value) => typeof value === "string", {
            message:
              "phoneNumber should be a string with a minimum length of 10",
          }),
        moneyAmount: z.string(),
        uid: z
          .string()
          .min(36)
          .refine(
            (value) =>
              /^[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}$/.test(
                value
              ),
            { message: "uid should be a string representing a valid UID" }
          ),
        isActive: z.boolean(),
        data: z.object({
          key: z.string(),
        }),
        numbers: z.array(
          z.object({
            name: z.string(),
            age: z.number(),
          })
        ),
        nestedObject: z.object({
          nestedKey: z.string(),
        }),
        websiteUrl: z.string(),
      }),
    })
  ),
  nestedObject: z.object({
    nestedKey: z.string(),
  }),
  websiteUrl: z.string(),
});

export type ExampleObjectSchema = z.infer<typeof exampleObjectSchema>;

export function validateExampleObjectSchema(data: any) {
  const validationResult = exampleObjectSchema.safeParse(data);
  return {
    success: validationResult.success,
    data: validationResult.success
      ? (validationResult.data as ExampleObjectSchema)
      : undefined,
    errors: validationResult.success
      ? undefined
      : validationResult.error.flatten().fieldErrors,
  };
}
