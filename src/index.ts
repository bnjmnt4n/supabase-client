import { type SupabaseClient as OriginalSupabaseClient } from "@supabase/supabase-js";

import {
  type PostgrestQueryBuilder,
  type PostgrestFilterBuilder,
} from "./postgrest";

export * from "./postgrest";

export type SupabaseClient = {
  /**
   * Perform a table operation.
   *
   * @param table The table name to operate on.
   */
  from<T = any>(table: string): PostgrestQueryBuilder<T>;

  /**
   * Perform a function call.
   *
   * @param fn  The function name to call.
   * @param params  The parameters to pass to the function call.
   * @param head   When set to true, no data will be returned.
   * @param count  Count algorithm to use to count rows in a table.
   *
   */
  rpc<T = any>(
    fn: string,
    params?: object,
    options?: {
      head?: boolean;
      count?: null | "exact" | "planned" | "estimated";
    }
  ): PostgrestFilterBuilder<T>;
} & Omit<OriginalSupabaseClient, "from" | "rpc">;
