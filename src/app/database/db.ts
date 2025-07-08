import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Ensure SQLite uses Promises
sqlite3.verbose();

export async function openDb() {
  return open({
    filename: './mydb.sqlite',
    driver: sqlite3.Database,
  });
}