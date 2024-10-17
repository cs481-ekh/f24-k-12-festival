import sqlite3 from 'sqlite3'
import { open } from 'sqlite3'

export async function openDB() {
    return open({
        filename: './vendors.sqlite',
        driver: sqlite3.Database
    })
}