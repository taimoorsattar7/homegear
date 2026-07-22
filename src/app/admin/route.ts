import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  const filePath = path.join(process.cwd(), 'public', 'admin', 'index.html')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  return new NextResponse(fileContents, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
    },
  })
}
