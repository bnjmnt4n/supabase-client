import { PostgrestFilterBuilder } from "./PostgrestFilterBuilder";
import { PostgrestQueryBuilder } from "./PostgrestQueryBuilder";

export interface PostgrestClient<
  Definitions extends Record<string, Record<string, any>>
> {
  /**
   * Authenticates the request with JWT.
   *
   * @param token  The JWT token to use.
   */
  auth(token: string): this;

  /**
   * Perform a table operation.
   *
   * @param table  The table name to operate on.
   */
  from<TableName extends keyof Definitions & string>(
    table: TableName
  ): PostgrestQueryBuilder<Definitions, Definitions[TableName], TableName>;
  from<T = any>(table: string): PostgrestQueryBuilder<Definitions, T>;

  /**
   * Perform a function call.
   *
   * @param fn  The function name to call.
   * @param params  The parameters to pass to the function call.
   * @param head  When set to true, no data will be returned.
   * @param count  Count algorithm to use to count rows in a table.
   */
  rpc<T = any>(
    fn: string,
    params?: object,
    {
      head,
      count,
    }?: {
      head?: boolean;
      count?: null | "exact" | "planned" | "estimated";
    }
  ): PostgrestFilterBuilder<Definitions, T>;
}
