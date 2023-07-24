import { Pool } from "pg";

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'naog7412',
    database: 'firstapi'
});
