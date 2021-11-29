# supabase-client

An alternative TypeScript-based Supabase client.

This package is an alternative to the official [`@supabase/supabase-js`](https://github.com/supabase/supabase-js) client, with the intention of experiment with better TypeScript type definitions. In the future, this package might also contain other experiments such as a more tree-shaking-friendly API, and other UX/DX improvements, with the hope that they might eventually be upstreamed into [`@supabase/supabase-js` v2](https://github.com/supabase/supabase-js/issues/170).

## Features

- Use of template literals types to construct return type definitions of your queries, without having to manually specify them:

    ```ts
    // Before:
    // Instead of having to specify the query and the definition:

    type WorkspaceWithTeam =
      definition["workspaces"] & {
        team: {
          user: Pick<definition["users"], "id" | "email">;
        };
      };

    supabase
      .from<WorkspaceWithTeam>("workspaces")
      .select(`
        *,
        team:members(
          user:users(
            id,
            email
          )
        )
      `);

    // After:
    // Just specify the query once!
    supabase
      .from("workspaces")
      .select(`
        *,
        team:members(
          user:users(
            id,
            email
          )
        )
      `);
    ```
- Type-checking of your `select(query)` format
- IntelliSense suggestions of fields in filter conditions:

    ```ts
    supabase
      .from("workspaces")
      .select(`
        name,
        id,
        team:members(
          user:users(
            id,
            email
          )
        )
      `)
      .filter("|", "eq", X);
      // Provides auto-complete suggestions of "name" | "id" | "team.user.id" | "team.user.email"
    ```

## Usage

Install using npm or yarn:

```sh
npm i @supabase/supabase-js 
npm i --D @bnjmnt4n/supabase-client
```

For now, this package only provides alternative types for the `@supabase/supabase-js` client. TypeScript v4.5.0+ is required.

```ts
import { createClient } from "@supabase/supabase-js";
import { type SupabaseClient } from "@bnjmnt4n/supabase-client";

// Type-definitions for each table in your schema. See 
import { definitions } from "lib/__generated__/supabase.ts";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, OPTIONS)
  as unknown as SupabaseClient<definitions>;

const { data, error } = await supabase
  .from("users")
  .select(`
    email,
    name,
    products(
      id,
      name
    )
  `)
  .maybeSingle();

if (data) {
  data.name;
  data.email;

  if ("length" in data.products) {
    // Array of products.
    data.products[0].id;
  } else {
    // Single product.
    data.products.id;
  }
}
```

## Bugs/Issues?

If there are any issues with the types, you can simply cast the client back to the original type definitions:

```ts
import { type SupabaseClient } from "@supabase/supabase-js";

(supabase as unknown as SupabaseClient).from("").select();
```

Do report any bugs though!
