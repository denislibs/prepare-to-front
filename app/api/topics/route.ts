import { NextResponse } from 'next/server';
import { topics } from '@/utils/topics';

export async function GET() {
  return NextResponse.json(topics);
}

