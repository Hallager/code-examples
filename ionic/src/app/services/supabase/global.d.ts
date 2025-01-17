import type { Database as db } from './db.types'


declare global {
    type Database = db
    type tempTbl = db["public"]["Tables"]["temp_tbl"]["Row"]

}
