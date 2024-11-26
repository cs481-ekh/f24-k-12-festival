import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

// Use this for production

export async function openDB() {
    return open({
        filename: '/app/data/vendors.db',
        driver: sqlite3.Database,
    });
}

// Use this for local development

// export async function openDB() {
//     return open({
//         filename: './data/vendors.db',
//         driver: sqlite3.Database,
//     });
// }