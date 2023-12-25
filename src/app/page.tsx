"use client";
import generateZodValidationCode from "@/lib/generate-zod-validation/generateWriteZodValidation";
import generateZodValidation from "@/lib/generate-zod-validation/generateZodValidation";
import { validateExampleObjectSchema } from "@/lib/generate-zod-validation/testSchema";
import { ZodError, z } from "zod";

export default function TestPage() {
  // Example usage
  const exampleObject = {

    numbers: [
      // 1,
      // 2
      {
        name: "John Doe",
        age: 25,
        email: "",
        phoneNumber: "1234567890",
        obj: {
          name: "John Doe",
          age: 25,
          email: "",
          phoneNumber: "1234567890",
          moneyAmount: "123.45",
          uid: "abc12345-1234-abcd-5678-abcd12345678",
          isActive: true,
          data: { key: "value" },
          numbers: [
            // 1,
            // 2
            {
              name: "John Doe",
              age: 25,
           
            },
          ],
          nestedObject: {
            nestedKey: "nestedValue",
          },
          websiteUrl: "https://example.com",
        },
      },
    ],
    nestedObject: {
      nestedKey: "nestedValue",
    },
    websiteUrl: "https://example.com",
  };

  console.log(validateExampleObjectSchema(exampleObject));

  // const generatedValidation = generateZodValidation(exampleObject);
  const generatedCodeValidation = generateZodValidationCode(exampleObject,'exampleObject');

  // You can now use the generated validation to validate objects
  try {
    // console.log("validatedObject");

    // const validatedObject = generatedValidation.parse(exampleObject);
    // console.log({generatedValidation,validatedObject});

    console.log("===============================");

    console.log(generatedCodeValidation);
  } catch (error) {
    if (error instanceof ZodError) {
      console.error(error.errors);
    } else {
      console.error(error);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      NextJs
    </main>
  );
}
