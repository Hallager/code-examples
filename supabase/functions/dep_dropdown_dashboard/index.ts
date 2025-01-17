// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.45.6";
import { corsHeaders } from "../_shared/cors.ts";

interface dropdownDashboard {
  pattern: string;
  name: string;
  display: string;
  institution_id: number;
  item_id: number;
  is_institution: boolean;
  is_primery: boolean
}

Deno.serve(async (req) => {

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }
  
  const { url, method } = req;

  // Define a pattern to extract query parameters
  const pattern = new URLPattern({
    pathname: "/dep_dropdown_dashboard",
  });
  const matchingPath = pattern.exec(url);
  if (!matchingPath) {
    return new Response("Invalid path", { status: 404 });
  }

  // Parse query parameters
  const { searchParams } = new URL(url);
  const account_id = searchParams.get("account_id");

  if (!account_id) {
    return new Response("Missing required query parameters", { status: 400 });
  }
  const authHeader = req.headers.get("Authorization")!;

  const supabase = createClient<Database>(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: {...corsHeaders,  Authorization: authHeader } } },
  );

  const { data: { user }, error: error_user } = await supabase.auth.getUser();
  if (error_user) {
    console.log(error_user);
    return new Response(JSON.stringify({ status: "unauthorized" }), {
      status: 401,
      headers: {...corsHeaders,  "Content-Type": "application/json" },
    });
  }

  const { data: user_roles, error: user_roles_error } = await supabase
    .schema("...")
    .from("...")
    .select(`*`)
    .eq("user_id", user?.id ?? "")
    .eq("account_id", account_id);

  if (user_roles_error) {
    console.log(user_roles_error);
    return new Response(JSON.stringify({ status: "not found" }), {
      status: 404,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const ins_ids = user_roles?.map((x: account_view) =>
    x.institution_id
  ) || [];

  const { data: _deps, error: dep_error } = await supabase
    .schema("...")
    .from("...")
    .select(`*`)
    .in("ids", ins_ids);

  if (dep_error) {
    console.log(dep_error);
    return new Response(JSON.stringify({ status: "not found" }), {
      status: 404,
      headers: {...corsHeaders,  "Content-Type": "application/json" },
    });
  }

  const { data: staff_department, error: staff_department_error } =
    await supabase
      .schema("...")
      .from("...")
      .select(`*`)
      .eq("ids", user?.id ?? "")
      .eq("primary", true);

  let dropdown: dropdownDashboard[] = [];
  user_roles?.forEach((role) => {
    const deps = _deps?.filter((x) =>
      x.institution == role.institution_id
    ) || [];

    if (deps.length > 0 && !dropdown.find((x) => x.institution_id == role.institution_id)) {
      let int_pattern = `int:${role.institution_id}`;
    
      deps.forEach((dep) => {
        let dep_pattern = `dep:${role.institution_id}:${dep.id}`;
        let yours = staff_department?.find((x) => x.department == dep.id);

        dropdown.push({
          institution_id: role.institution_id,
          pattern: dep_pattern,
          name:dep.name,
          display: yours ? "__lang_yours_dep" : dep.name,
          item_id: dep.id,
          is_institution: false,
          is_primery: yours ? true : false
        } as dropdownDashboard);
      });
    }
  });

  return new Response(
    JSON.stringify(dropdown),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } },
  );
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/dep_dropdown_dashboard' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
