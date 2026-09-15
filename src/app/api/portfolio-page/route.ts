import { NextResponse } from 'next/server';
import { loadDriveGallery } from '@/lib/drive-gallery';

const PORTFOLIO_FOLDER_ID = '1WHV9yLnWAbPvmB_w8Y58e6vrB_2BmtYJ';

export async function GET() {
  const items = await loadDriveGallery(PORTFOLIO_FOLDER_ID);

  return NextResponse.json(
    { items },
    { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=86400' } }
  );
}
