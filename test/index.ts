import { SupabaseClient, OneOrMore } from "../src";

type Data = {
  unknown: OneOrMore<{ a: string; b: OneOrMore<{ c: number }> }>;
  content: OneOrMore<{ a: string }>;
  a: number;
  b: "a" | "b";
};

const supabase: SupabaseClient = {} as unknown as SupabaseClient;

async function main() {
  const response = await supabase
    .from<Data>("a")
    .select()
    .filter("unknown.b.c", "eq", 999)
    .lte("a", 999999)
    .not("content.a", "eq", "1")
    .is("content.a", true);

  if (response.data) {
    if ("length" in response.data[0].content) {
      response.data[0].content[0].a;
    }
  }
}

main();
