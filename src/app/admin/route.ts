import { NextResponse } from 'next/server'

const adminHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sveltia CMS - Homegear</title>
    <link rel="cms-config-url" type="text/yaml" href="/admin/config.yml" />
    <!-- Sveltia CMS script -->
    <script src="https://unpkg.com/@sveltia/cms@latest/dist/sveltia-cms.js" type="module"></script>
  </head>
  <body></body>
</html>`

export async function GET() {
  return new NextResponse(adminHtml, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
    },
  })
}
