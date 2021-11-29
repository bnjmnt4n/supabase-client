/* eslint-disable @typescript-eslint/no-unused-vars */

import { SupabaseClient } from "../src";

type definitions = {
  workspaces: {
    id: string;
    name: string;
  };
  members: {
    workspace_id: string;
    user_id: string;
  };
  users: {
    id: string;
    email: string;
  };
};

const supabase = {} as unknown as SupabaseClient<definitions>;

async function main() {
  const response1 = await supabase
    .from("workspaces")
    .select()
    .filter("name", "eq", "ABC")
    .lte("id", "UUID");

  const response2 = await supabase
    .from("workspaces")
    .select(
      `
        *,
        team:members(
          workspaceId:workspace_id,
          user:users(
            id,
            email
          )
        )
      `
    )
    .filter("id", "eq", "ABC")
    .lte("name", "UUID")
    .not("team.user.id", "eq", "1")
    .eq("team.workspaceId", "99999999");

  const response3 = await supabase
    .from("users")
    .select(`id`)
    .filter("id", "eq", "XXXXXXXXXXXXXXXXXXXXXX");
}

main();
