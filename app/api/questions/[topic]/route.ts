import { NextRequest, NextResponse } from 'next/server';
import { parseQuestionsFile } from '@/lib/md-parser';
import { getTopicById } from '@/utils/topics';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ topic: string }> }
) {
  try {
    const { topic } = await params;
    const topicData = getTopicById(topic);
    
    if (!topicData) {
      return NextResponse.json(
        { error: 'Topic not found' },
        { status: 404 }
      );
    }
    
    const questions = await parseQuestionsFile(topicData.file);
    
    return NextResponse.json({
      topic: topicData,
      questions,
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch questions' },
      { status: 500 }
    );
  }
}

