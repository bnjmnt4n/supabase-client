import { type OneOrMore } from "postgrest-query";

export { type OneOrMore } from "postgrest-query";

/**
 * Constructs a union type of potential paths for the given object.
 *
 * @param T The given object.
 * @param [Key=keyof T] Either the keys of `T` or a subset of them.
 */
export type Path<T, Key extends keyof T = keyof T> = Key extends string
  ? T[Key] extends OneOrMore<infer R>
    ? `${Key}.${Path<R, Exclude<keyof R, keyof Array<any>>> & string}`
    : T[Key] extends Array<infer R>
    ? `${Key}.${Path<R, Exclude<keyof R, keyof Array<any>>> & string}`
    : T[Key] extends Record<string, any>
    ?
        | `${Key}.${Path<T[Key], Exclude<keyof T[Key], keyof Array<any>>> &
            string}`
        | `${Key}.${Exclude<keyof T[Key], keyof Array<any>> & string}`
        | Key
    : T[Key] extends any
    ? Key
    : never
  : never;

/**
 * Obtains the type of the property at the given path `P` of object `T`.
 *
 * @param T The given object.
 * @param P The path to get type from.
 */
export type PathValue<
  T,
  P extends Path<T>
> = P extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
    ? Rest extends Path<T[Key]>
      ? PathValue<T[Key], Rest>
      : T[Key] extends OneOrMore<infer R>
      ? Rest extends Path<R>
        ? PathValue<R, Rest>
        : never
      : T[Key] extends Array<infer R>
      ? Rest extends Path<R>
        ? PathValue<R, Rest>
        : never
      : never
    : never
  : P extends keyof T
  ? T[P]
  : never;
