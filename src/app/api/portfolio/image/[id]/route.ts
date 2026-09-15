import { NextRequest, NextResponse } from 'next/server';

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: NextRequest, context: RouteContext) {
  const { id } = await context.params;

  if (!/^[\w-]+$/.test(id)) {
    return new NextResponse('Invalid image id', { status: 400 });
  }

  try {
    const response = await fetch(`https://drive.google.com/thumbnail?id=${id}&sz=w1600`, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
      cache: 'no-store',
      signal: AbortSignal.timeout(8_000),
    });

    const contentType = response.headers.get('content-type') ?? '';

    if (!response.ok || !contentType.startsWith('image/')) {
      return new NextResponse('Image unavailable', { status: 404 });
    }

    return new NextResponse(response.body, {
      headers: {
        'Cache-Control': 'public, max-age=300, s-maxage=300, stale-while-revalidate=86400',
        'Content-Type': contentType,
      },
    });
  } catch {
    return new NextResponse('Image unavailable', { status: 404 });
  }
}
