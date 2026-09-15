import { NextResponse } from 'next/server';

const ALERT_SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vR4LB9sgXBq9u0zSxZtqFvtg2KSacS3jsHxTV3lA8rUOEtGAYZhpUdVj5XWtJsY3vtFKqUeombofDWx/pub?output=csv';

type AlertType = 'warning' | 'info' | 'success';

type SiteAlert = {
  active: boolean;
  type: AlertType;
  title: string;
  message: string;
};

type AlertRow = Record<string, string>;

const emptyAlert: SiteAlert = {
  active: false,
  type: 'warning',
  title: '',
  message: '',
};

function parseCsv(csv: string) {
  const rows: string[][] = [];
  let row: string[] = [];
  let value = '';
  let inQuotes = false;

  for (let index = 0; index < csv.length; index += 1) {
    const char = csv[index];
    const nextChar = csv[index + 1];

    if (char === '"' && inQuotes && nextChar === '"') {
      value += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === ',' && !inQuotes) {
      row.push(value);
      value = '';
      continue;
    }

    if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        index += 1;
      }
      row.push(value);
      if (row.some((cell) => cell.trim() !== '')) {
        rows.push(row);
      }
      row = [];
      value = '';
      continue;
    }

    value += char;
  }

  row.push(value);
  if (row.some((cell) => cell.trim() !== '')) {
    rows.push(row);
  }

  const [headers, ...dataRows] = rows;
  if (!headers?.length) {
    return [];
  }

  const normalizedHeaders = headers.map((header) => header.trim().toLowerCase());

  return dataRows.map((dataRow) =>
    normalizedHeaders.reduce<AlertRow>((record, header, index) => {
      record[header] = dataRow[index]?.trim() ?? '';
      return record;
    }, {})
  );
}

function isActiveValue(value: string) {
  return ['ano', 'áno', 'true', '1', 'yes'].includes(value.trim().toLowerCase());
}

function getDateValue(value: string) {
  if (!value.trim()) {
    return null;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function isWithinDateRange(row: AlertRow) {
  const now = new Date();
  const from = getDateValue(row.zobrazit_od ?? '');
  const to = getDateValue(row.zobrazit_do ?? '');

  if (from && now < from) {
    return false;
  }

  if (to) {
    const endOfDay = new Date(to);
    endOfDay.setHours(23, 59, 59, 999);
    if (now > endOfDay) {
      return false;
    }
  }

  return true;
}

function normalizeType(value: string): AlertType {
  if (value === 'info' || value === 'success') {
    return value;
  }

  return 'warning';
}

function toAlert(row: AlertRow): SiteAlert {
  return {
    active: true,
    type: normalizeType((row.typ ?? '').trim().toLowerCase()),
    title: row.nadpis || 'Oznam',
    message: row.sprava || '',
  };
}

export async function GET() {
  try {
    const response = await fetch(ALERT_SHEET_CSV_URL, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json(emptyAlert, { headers: { 'Cache-Control': 'no-store' } });
    }

    const csv = await response.text();
    const rows = parseCsv(csv);
    const activeAlert = rows
      .filter((row) => isActiveValue(row.aktivne ?? ''))
      .filter((row) => !row.web_id || row.web_id === 'homepage-main')
      .filter((row) => (row.sprava ?? '').trim().length > 0)
      .filter(isWithinDateRange)
      .sort((a, b) => Number(a.priorita || 999) - Number(b.priorita || 999))[0];

    return NextResponse.json(activeAlert ? toAlert(activeAlert) : emptyAlert, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch {
    return NextResponse.json(emptyAlert, { headers: { 'Cache-Control': 'no-store' } });
  }
}
