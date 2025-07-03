import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  
  const robots = `User-agent: *
Allow: /

# 不允許爬取的路徑
Disallow: /api/
Disallow: /admin/
Disallow: /dashboard/
Disallow: /auth/error/
Disallow: /_next/
Disallow: /vercel.svg

# Sitemap位置
Sitemap: ${baseUrl}/sitemap.xml

# 爬取延遲（可選）
Crawl-delay: 1`

  return new NextResponse(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate'
    }
  })
}
