
import sqlite3 from 'sqlite3';
import { open, type Database } from 'sqlite';

// Ensure SQLite uses Promises
sqlite3.verbose();

let db: Database | null = null;

export async function openDb() {
  if (db) {
    return db;
  }

  const newDb = await open({
    filename: './mydb.sqlite',
    driver: sqlite3.Database,
  });

  await newDb.exec(`CREATE TABLE IF NOT EXISTS attendees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    title TEXT,
    company TEXT,
    interests TEXT,
    personalityTraits TEXT,
    avatar TEXT
  )`);

  const count = await newDb.get('SELECT COUNT(*) as count FROM attendees');

  if (count.count === 0) {
    const seedData = [
      { name: 'David Miller', title: 'Data Scientist at BigData Corp', company: 'BigData Corp', interests: ['AI', 'SaaS', 'Venture Capital'], personalityTraits: ['Analytical', 'Driven'], avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&h=300&fit=crop' },
      { name: 'Emily White', title: 'UX Lead at Creative Solutions', company: 'Creative Solutions', interests: ['UX/UI Design', 'Frontend Development', 'Web3'], personalityTraits: ['Creative', 'Collaborative'], avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&h=300&fit=crop' },
      { name: 'Frank Green', title: 'ML Researcher at DeepLearn AI', company: 'DeepLearn AI', interests: ['AI', 'ML', 'Data Science'], personalityTraits: ['Analytical', 'Introverted'], avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=300&h=300&fit=crop' },
      { name: 'Grace Hall', title: 'Head of Product at ScaleFast', company: 'ScaleFast', interests: ['Product Management', 'SaaS', 'Growth Hacking'], personalityTraits: ['Extroverted', 'Leader'], avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&h=300&fit=crop' },
      { name: 'Alice Johnson', title: 'Lead AI Engineer at Innovate Inc.', company: 'Innovate Inc.', interests: ['Generative AI', 'Ethical ML'], avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&h=300&fit=crop' },
      { name: 'Ben Carter', title: 'Developer Advocate at Groq', company: 'Groq', interests: ['High-performance computing', 'API design'], avatar: 'https://images.unsplash.com/photo-1591799264318-7e6e74e3dce9?q=80&w=300&h=300&fit=crop' },
      { name: 'Carlos Gomez', title: 'Founder of ScaleUp Solutions', company: 'ScaleUp Solutions', interests: ['SaaS', 'Startups'], avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&h=300&fit=crop' },
      { name: 'Samantha Lee', title: 'Product Manager at TechGiant', company: 'TechGiant', interests: ['Product-led growth', 'UI/UX'], avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&h=300&fit=crop' },
      { name: 'Alex Doe', title: 'AI Enthusiast', company: 'AIxMeet', interests: ['AI', 'SaaS', 'dev'], avatar: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=300&h=300&fit=crop' },
    ];
    
    const uniqueAttendees = new Map();
    seedData.forEach(person => {
        if (person.name && !uniqueAttendees.has(person.name)) {
            uniqueAttendees.set(person.name, {
                name: person.name,
                title: person.title || 'Attendee',
                company: person.company || 'N/A',
                interests: JSON.stringify(person.interests || []),
                personalityTraits: JSON.stringify(person.personalityTraits || []),
                avatar: person.avatar || 'https://placehold.co/300x300.png',
            });
        }
    });

    const stmt = await newDb.prepare('INSERT INTO attendees (name, title, company, interests, personalityTraits, avatar) VALUES (?, ?, ?, ?, ?, ?)');
    for (const person of uniqueAttendees.values()) {
        await stmt.run(person.name, person.title, person.company, person.interests, person.personalityTraits, person.avatar);
    }
    await stmt.finalize();
  }

  db = newDb;
  return db;
}
