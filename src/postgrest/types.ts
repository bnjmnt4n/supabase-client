import {
  type OneOrMore,
  type GetDefinition,
  type ParseQuery,
} from "postgrest-query";
import { type PostgrestFilterBuilder } from "./PostgrestFilterBuilder";

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

/**
 * Tries to get the type definition of a specific query's response by parsing the given columns for
 * the given table using `postgrest-query`. Otherwise, returns the default definition.
 *
 * @param Definitions Type definitions of all tables.
 * @param Definition The default definition.
 * @param TableName The table name.
 * @param Columns The columns to select from the given table.
 */
export type TryGetDefinition<
  Definitions extends Record<string, Record<string, any>>,
  Definition,
  TableName extends string | null,
  Columns extends string
> = TableName extends string
  ? ParseQuery<Columns> extends unknown[]
    ? PostgrestFilterBuilder<
        Definitions,
        GetDefinition<Definitions, TableName, ParseQuery<Columns>>
      >
    : ParseQuery<Columns>
  : PostgrestFilterBuilder<Definitions, Definition>;

export type RemoveOneOrMore<T> = {
  [Key in keyof T]: T[Key] extends OneOrMore<infer A> ? A | A[] : T[Key];
};
