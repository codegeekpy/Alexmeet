
import { NextResponse } from 'next/server';
import { openDb } from '@/app/database/db';

export async function GET() {
  try {
    const db = await openDb();
    const attendees = await db.all('SELECT * FROM attendees');
    
    // The interests and personalityTraits are stored as JSON strings.
    // We need to parse them back into arrays before sending them to the client.
    const parsedAttendees = attendees.map(attendee => ({
        ...attendee,
        interests: JSON.parse(attendee.interests || '[]'),
        personalityTraits: JSON.parse(attendee.personalityTraits || '[]')
    }));

    return NextResponse.json(parsedAttendees);
  } catch (error) {
    console.error('Failed to fetch attendees:', error);
    return NextResponse.json({ message: 'Error fetching attendees' }, { status: 500 });
  }
}
