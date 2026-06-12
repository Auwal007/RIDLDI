import { NextResponse } from 'next/server';
import { getApplications, addApplication } from '@/lib/db';

export async function GET() {
  const applications = getApplications();
  return NextResponse.json(applications);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newApplication = addApplication(body);
    return NextResponse.json(newApplication, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create application' }, { status: 400 });
  }
}
