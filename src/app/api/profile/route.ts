import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('Profile data received:', data);
    // In a real application, you would save this data to a database.
    return NextResponse.json({ message: 'Profile updated successfully', data });
  } catch (error) {
    console.error('Failed to process profile update:', error);
    return NextResponse.json({ message: 'Error updating profile' }, { status: 500 });
  }
}
