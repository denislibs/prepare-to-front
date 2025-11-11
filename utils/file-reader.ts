import { readFile } from 'fs/promises';
import { join } from 'path';

// Путь к корню проекта
const PROJECT_ROOT = process.cwd();
// Файлы теперь в public
const PUBLIC_DIR = join(PROJECT_ROOT, 'public');
const QUESTIONS_DIR = join(PUBLIC_DIR, 'questions');
const ANSWERS_DIR = join(PUBLIC_DIR, 'answers');
const ASSETS_DIR = join(PUBLIC_DIR, 'assets');

export async function readQuestionFile(topicFile: string): Promise<string> {
  const filePath = join(QUESTIONS_DIR, topicFile);
  try {
    const content = await readFile(filePath, 'utf-8');
    return content;
  } catch (error) {
    console.error(`Error reading question file ${topicFile}:`, error);
    throw new Error(`Failed to read question file: ${topicFile}`);
  }
}

export async function readAnswerFile(topicId: string, answerFile: string): Promise<string> {
  const filePath = join(ANSWERS_DIR, topicId, answerFile);
  try {
    const content = await readFile(filePath, 'utf-8');
    return content;
  } catch (error) {
    console.error(`Error reading answer file ${answerFile}:`, error);
    throw new Error(`Failed to read answer file: ${answerFile}`);
  }
}

export function getAssetPath(assetName: string): string {
  return join(ASSETS_DIR, assetName);
}

export function getQuestionsDir(): string {
  return QUESTIONS_DIR;
}

export function getAnswersDir(): string {
  return ANSWERS_DIR;
}

