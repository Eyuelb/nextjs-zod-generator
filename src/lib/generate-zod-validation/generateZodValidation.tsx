import { z, ZodObject, ZodError } from 'zod';

type AnyObject = Record<string, unknown>;

export default function generateZodValidation<T extends AnyObject>(obj: T) {
  const schema: Record<string, z.ZodType<any, any, any>> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];

      // Switch statement to handle different data types

      switch (typeof value) {
        case 'string':
            // codeDisplay += `${}`;
          schema[key] = z.string().min(String(value).length, {
            message: `${key} should be a string with a minimum length of ${String(value).length}`,
          });
          break;

        case 'number':
          schema[key] = z.number();
          break;

        case 'boolean':
          schema[key] = z.boolean();
          break;

        // Add more cases for other data types as needed

        default:
          // Handle unknown data types
          throw new Error(`Unsupported data type for ${key}`);
      }
    }
  }

  const validation = z.object(schema);

  console.log(validation._def);

  return validation;
}
