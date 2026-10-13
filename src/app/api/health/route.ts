import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'jawa-epic-backend',
    timestamp: new Date().toISOString(),
  });
}
