import { z } from "zod";
import { identifyValueType } from "./identify-value-type";
import { capitalizeFirstLetterRegex } from "./utils/parser";

type AnyObject = Record<string, unknown>;

function generateMessage(key: string, message: string): string {
  return `{ message: '${key} ${message}' }`;
}

function generateValidationForValue(key: string, value: any): string {
  const valueType = identifyValueType(value);

  switch (valueType) {
    case "PhoneNumber":
      return `z.string().min(${
        String(value).length
      }).refine((value) => typeof value === 'string', ${generateMessage(
        key,
        `should be a string with a minimum length of ${String(value).length}`
      )})`;

    case "Email":
      return `z.string().email(${generateMessage(key, "invalid email")})`;

    case "Money":
      return `z.string()`;

    case "Uid":
      return `z.string().min(${
        String(value).length
      }).refine((value) => /^[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}$/.test(value), ${generateMessage(
        key,
        "should be a string representing a valid UID"
      )})`;

    case "Number":
      return `z.number()`;

    case "Boolean":
      return `z.boolean()`;

    case "EmptyString":
      return `z.string().optional()`;

    case "Url":
      return `z.string()`;

    case "Array":
      const arrayElementsValidation =
        Array.isArray(value) &&
        value.map((element: any) => generateValidationForValue(key, element));
      return `z.array(${
        arrayElementsValidation && arrayElementsValidation.join(", ")
      })`;

    case "Object":
      let codeDisplay = "z.object({\n";

      for (const k in value) {
        if (Object.prototype.hasOwnProperty.call(value, k)) {
          const v = value[k];
          const validationCode = generateValidationForValue(k, v);
          codeDisplay += `  ${k}: ${validationCode},\n`;
        }
      }
      codeDisplay += "})";

      return codeDisplay;

    default:
      console.log(`Unknown type for ${key}: ${valueType}`);
      return `z.string()`;
  }
}

export default function generateZodValidationCode(
  obj: AnyObject,
  schemaVariableName: string
) {
  let codeDisplay = `import { z } from "zod";\n`;
  codeDisplay += `export const ${schemaVariableName}Schema = z.object({\n`;

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      const validationCode = generateValidationForValue(key, value);
      codeDisplay += `  ${key}: ${validationCode},\n`;
    }
  }

  codeDisplay += "});\n";
  codeDisplay += `\n export type ${capitalizeFirstLetterRegex(
    schemaVariableName
  )}Schema = z.infer<typeof ${schemaVariableName}Schema>;`;
  // Add the validation function
  const validationFunctionName = `validate${capitalizeFirstLetterRegex(
    schemaVariableName
  )}Schema`;
  codeDisplay += `
 export function ${validationFunctionName}(data: any) {
   const validationResult = ${schemaVariableName}Schema.safeParse(data);
   return {
     success: validationResult.success,
     data: validationResult.success ? (validationResult.data as ${capitalizeFirstLetterRegex(
       schemaVariableName
     )}Schema) : undefined,
     errors: validationResult.success ? undefined : validationResult.error.flatten().fieldErrors,
   };
 }
 `;
  codeDisplay += "\n";
  return codeDisplay;
}
