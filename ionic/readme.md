# heavily redacted project

## How to start your Ionic project with SSL and specified host/port

Kommandoen:

```bash
ionic serve --external --host="127.0.0.1" --port="8100" --ssl
```

## Benytter Supabase CLI’en til at generere TypeScript-typer

Angiver, hvilke skemaer i din Supabase-database der skal genereres typer

```bash
npx supabase gen types --schema public --schema base --schema posts > supabase/functions/_shared/types/db.types.ts --project-id "..."

```
