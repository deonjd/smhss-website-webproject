import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    const allowedTypes = ['site-content', 'faculty', 'achievements', 'gallery', 'news'];

    if (type) {
      if (!allowedTypes.includes(type)) {
        return NextResponse.json(
          { success: false, error: `Invalid content type: ${type}` },
          { status: 400 }
        );
      }
      const filePath = path.join(process.cwd(), 'src', 'content', `${type}.json`);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      return NextResponse.json(JSON.parse(fileContent));
    }

    // Load and return all JSON data combined
    const combinedData: Record<string, any> = {};
    for (const t of allowedTypes) {
      const filePath = path.join(process.cwd(), 'src', 'content', `${t}.json`);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      combinedData[t] = JSON.parse(fileContent);
    }

    return NextResponse.json(combinedData);
  } catch (error: any) {
    console.error('Error reading content files:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
