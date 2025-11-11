import { readQuestionFile } from '@/utils/file-reader';

export interface Question {
  text: string;
  link?: string;
  answerFile?: string;
  isYouTube?: boolean;
}

export async function parseQuestionsFile(topicFile: string): Promise<Question[]> {
  const content = await readQuestionFile(topicFile);
  const questions: Question[] = [];
  
  // Парсим markdown список вопросов
  const lines = content.split('\n');
  let currentQuestion: Partial<Question> = {};
  
  for (const line of lines) {
    // Ищем строки с вопросами (начинаются с - [)
    const questionMatch = line.match(/^-\s+\[([^\]]+)\]\(([^)]+)\)/);
    
    if (questionMatch) {
      // Сохраняем предыдущий вопрос, если есть
      if (currentQuestion.text) {
        questions.push(currentQuestion as Question);
      }
      
      const questionText = questionMatch[1];
      const link = questionMatch[2];
      
      // Определяем, это YouTube ссылка или файл ответа
      const isYouTube = link.startsWith('https://youtu.be') || link.startsWith('https://www.youtube.com');
      const answerFile = !isYouTube ? link.replace('../answers/', '').replace('.md', '') : undefined;
      
      currentQuestion = {
        text: questionText,
        link,
        answerFile,
        isYouTube,
      };
    }
  }
  
  // Добавляем последний вопрос
  if (currentQuestion.text) {
    questions.push(currentQuestion as Question);
  }
  
  return questions;
}

export function extractQuestionSlug(questionText: string): string {
  // Преобразуем текст вопроса в slug для URL
  return questionText
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

