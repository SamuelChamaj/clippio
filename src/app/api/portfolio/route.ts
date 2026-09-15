import { NextResponse } from 'next/server';
import { loadDriveGallery } from '@/lib/drive-gallery';

export async function GET() {
  const items = await loadDriveGallery(process.env.GOOGLE_DRIVE_FOLDER_ID);

  return NextResponse.json(
    { items },
    { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=86400' } }
  );
}
