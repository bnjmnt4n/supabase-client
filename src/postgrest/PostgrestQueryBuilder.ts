import { type PostgrestBuilder } from "@supabase/postgrest-js";
import { type PostgrestFilterBuilder } from "./PostgrestFilterBuilder";

export interface PostgrestQueryBuilder<Definition>
  extends PostgrestBuilder<Definition> {
  /**
   * Performs vertical filtering with SELECT.
   *
   * @param columns  The columns to retrieve, separated by commas.
   * @param head  When set to true, select will void data.
   * @param count  Count algorithm to use to count rows in a table.
   */
  select(
    columns?: string,
    {
      head,
      count,
    }?: {
      head?: boolean;
      count?: null | "exact" | "planned" | "estimated";
    }
  ): PostgrestFilterBuilder<Definition>;

  /**
   * Performs an INSERT into the table.
   *
   * @param values  The values to insert.
   * @param returning  By default the new record is returned. Set this to 'minimal' if you don't need this value.
   * @param count  Count algorithm to use to count rows in a table.
   */
  insert(
    values: Partial<Definition> | Partial<Definition>[],
    options?: {
      returning?: "minimal" | "representation";
      count?: null | "exact" | "planned" | "estimated";
    }
  ): PostgrestFilterBuilder<Definition>;
  /**
   * @deprecated Use `upsert()` instead.
   */
  insert(
    values: Partial<Definition> | Partial<Definition>[],
    options?: {
      upsert?: boolean;
      onConflict?: string;
      returning?: "minimal" | "representation";
      count?: null | "exact" | "planned" | "estimated";
    }
  ): PostgrestFilterBuilder<Definition>;
  insert(
    values: Partial<Definition> | Partial<Definition>[],
    {
      upsert,
      onConflict,
      returning,
      count,
    }?: {
      upsert?: boolean;
      onConflict?: string;
      returning?: "minimal" | "representation";
      count?: null | "exact" | "planned" | "estimated";
    }
  ): PostgrestFilterBuilder<Definition>;

  /**
   * Performs an UPSERT into the table.
   *
   * @param values  The values to insert.
   * @param onConflict  By specifying the `on_conflict` query parameter, you can make UPSERT work on a column(s) that has a UNIQUE constraint.
   * @param returning  By default the new record is returned. Set this to 'minimal' if you don't need this value.
   * @param count  Count algorithm to use to count rows in a table.
   * @param ignoreDuplicates  Specifies if duplicate rows should be ignored and not inserted.
   */
  upsert(
    values: Partial<Definition> | Partial<Definition>[],
    {
      onConflict,
      returning,
      count,
      ignoreDuplicates,
    }?: {
      onConflict?: string;
      returning?: "minimal" | "representation";
      count?: null | "exact" | "planned" | "estimated";
      ignoreDuplicates?: boolean;
    }
  ): PostgrestFilterBuilder<Definition>;

  /**
   * Performs an UPDATE on the table.
   *
   * @param values  The values to update.
   * @param returning  By default the updated record is returned. Set this to 'minimal' if you don't need this value.
   * @param count  Count algorithm to use to count rows in a table.
   */
  update(
    values: Partial<Definition>,
    {
      returning,
      count,
    }?: {
      returning?: "minimal" | "representation";
      count?: null | "exact" | "planned" | "estimated";
    }
  ): PostgrestFilterBuilder<Definition>;

  /**
   * Performs a DELETE on the table.
   *
   * @param returning  If `true`, return the deleted row(s) in the response.
   * @param count  Count algorithm to use to count rows in a table.
   */
  delete({
    returning,
    count,
  }?: {
    returning?: "minimal" | "representation";
    count?: null | "exact" | "planned" | "estimated";
  }): PostgrestFilterBuilder<Definition>;
}
