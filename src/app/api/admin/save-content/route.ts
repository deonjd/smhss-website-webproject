import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { type, data } = await request.json();

    const allowedTypes = ['site-content', 'faculty', 'achievements', 'gallery', 'news'];
    if (!allowedTypes.includes(type)) {
      return NextResponse.json(
        { success: false, error: `Invalid content type: ${type}` },
        { status: 400 }
      );
    }

    const filePath = path.join(process.cwd(), 'src', 'content', `${type}.json`);

    // Write formatted JSON back to the file system
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');

    return NextResponse.json({
      success: true,
      message: `Successfully updated ${type} content`,
    });
  } catch (error: any) {
    console.error('Error saving content:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
