import { NextRequest, NextResponse } from 'next/server';

const WEB3FORMS_ACCESS_KEY = process.env.WEB3FORMS_ACCESS_KEY;

export async function POST(request: NextRequest) {
  if (!WEB3FORMS_ACCESS_KEY) {
    return NextResponse.json({ success: false, message: 'Kontaktný formulár nie je nakonfigurovaný.' }, { status: 500 });
  }

  try {
    const body = (await request.json()) as {
      email?: string;
      message?: string;
      name?: string;
      phone?: string;
      service?: string;
    };

    const formData = new FormData();
    formData.append('access_key', WEB3FORMS_ACCESS_KEY);
    formData.append('subject', 'Nová správa z kontaktného formulára Clippio');
    formData.append('from_name', 'Clippio web');
    formData.append('name', body.name?.trim() ?? '');
    formData.append('email', body.email?.trim() ?? '');
    formData.append('phone', body.phone?.trim() ?? '');
    formData.append('service', body.service?.trim() ?? '');
    formData.append('message', body.message?.trim() ?? '');
    formData.append('botcheck', '');

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    });

    const data = (await response.json()) as { success?: boolean; message?: string };

    if (!response.ok || !data.success) {
      return NextResponse.json(
        { success: false, message: data.message ?? 'Správu sa nepodarilo odoslať. Skús to znova.' },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, message: 'Správu sa nepodarilo odoslať. Skús to znova.' }, { status: 400 });
  }
}
