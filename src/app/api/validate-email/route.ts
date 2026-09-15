import { NextRequest, NextResponse } from 'next/server';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type DnsAnswer = {
  Answer?: Array<unknown>;
};

async function domainAcceptsEmail(domain: string) {
  const response = await fetch(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=MX`, {
    headers: {
      Accept: 'application/dns-json',
    },
    next: {
      revalidate: 300,
    },
    signal: AbortSignal.timeout(5_000),
  });

  if (!response.ok) {
    return false;
  }

  const data = (await response.json()) as DnsAnswer;

  return Boolean(data.Answer?.length);
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { email?: string };
    const email = body.email?.trim().toLowerCase() ?? '';

    if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
      return NextResponse.json({ valid: false, message: 'Skontroluj e-mailovú adresu.' }, { status: 400 });
    }

    const domain = email.split('@')[1];
    const acceptsEmail = await domainAcceptsEmail(domain);

    if (!acceptsEmail) {
      return NextResponse.json({ valid: false, message: 'Táto doména neprijíma e-maily.' }, { status: 400 });
    }

    return NextResponse.json({ valid: true });
  } catch {
    return NextResponse.json({ valid: false, message: 'Tento e-mail sa nepodarilo overiť.' }, { status: 400 });
  }
}
