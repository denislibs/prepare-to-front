import { NextRequest, NextResponse } from 'next/server';
import { readAnswerFile } from '@/utils/file-reader';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ topic: string; answer: string }> }
) {
  try {
    const { topic, answer } = await params;
    const content = await readAnswerFile(topic, `${answer}.md`);
    
    return NextResponse.json({ content });
  } catch (error) {
    console.error('Error fetching answer:', error);
    return NextResponse.json(
      { error: 'Failed to fetch answer' },
      { status: 500 }
    );
  }
}

