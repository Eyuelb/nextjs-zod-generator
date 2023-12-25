export type NonEmptyArray<T> = [T, ...T[]];

export function isNonEmptyArray<T>(value: T[]): value is NonEmptyArray<T> {
  return value.length !== 0;
}

export function capitalizeFirstLetterRegex(input: string): string {
    return input.replace(/^[a-z]/, (match) => match.toUpperCase());
}

