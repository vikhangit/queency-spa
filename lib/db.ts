import fs from 'fs/promises';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data', 'content.json');

export async function getContent() {
  const fileContent = await fs.readFile(DATA_PATH, 'utf-8');
  return JSON.parse(fileContent);
}

export async function updateContent(newContent: any) {
  await fs.writeFile(DATA_PATH, JSON.stringify(newContent, null, 2), 'utf-8');
  return newContent;
}
