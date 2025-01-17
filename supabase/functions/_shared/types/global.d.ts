import type { Database as db } from './db.types.ts'

declare global {
    type Database = db
    type tempTbl = db["public"]["Tables"]["temp_tbl"]["Row"]
}
