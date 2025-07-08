// pages/api/users.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { openDb } from '../database/db.ts';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = await openDb();

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    );
  `);

  if (req.method === 'POST') {
    const { name } = req.body;
    await db.run('INSERT INTO users (name) VALUES (?)', name);
    res.status(201).json({ message: 'User added' });
  } else if (req.method === 'GET') {
    const users = await db.all('SELECT * FROM users');
    res.status(200).json(users);
  } else {
    res.status(405).end();
  }
}
