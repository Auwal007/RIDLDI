import { NextResponse } from 'next/server';
import { getSystemSettings, updateSystemSettings } from '@/lib/db';

export async function GET() {
  try {
    const settings = getSystemSettings();
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve settings' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const updated = updateSystemSettings(body);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 400 });
  }
}
