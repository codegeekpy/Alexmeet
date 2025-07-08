// src/app/api/users/route.ts
import { NextResponse } from 'next/server';
import { openDb } from '@/app/database/db';

export async function GET() {
  const db = await openDb();
  await db.exec(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  )`);
  const users = await db.all('SELECT * FROM users');
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const { name } = await request.json();
  if (!name) return NextResponse.json({ error: 'Name required' }, { status: 400 });

  const db = await openDb();
  await db.run('INSERT INTO users (name) VALUES (?)', name);
  return NextResponse.json({ message: 'User added' }, { status: 201 });
}
