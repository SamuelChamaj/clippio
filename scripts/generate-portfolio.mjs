#!/usr/bin/env node
/**
 * Clippio – generátor data/portfolio-page.json z Google Drive
 *
 * Použitie (jednorazovo / v CI):
 *   1. V Google Cloud Console vytvor API kľúč s povoleným Drive API
 *   2. export GOOGLE_API_KEY=tvoj_kluc
 *   3. node scripts/generate-portfolio.mjs
 *
 * Skript zapíše data/portfolio-page.json a data/portfolio.json
 */

import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const FOLDER_ID = process.env.DRIVE_FOLDER_ID || '1VEKAMonI08t7Yo_fKRAgoce0XF49qAh0';
const API_KEY = process.env.GOOGLE_API_KEY;

if (!API_KEY) {
  console.error('Chýba GOOGLE_API_KEY. Nastav: export GOOGLE_API_KEY=...');
  process.exit(1);
}

const q = encodeURIComponent(`'${FOLDER_ID}' in parents and trashed=false and mimeType contains 'image/'`);
const url = `https://www.googleapis.com/drive/v3/files?q=${q}&fields=files(id,name,modifiedTime,mimeType)&orderBy=modifiedTime desc&pageSize=100&key=${API_KEY}`;

const response = await fetch(url);
if (!response.ok) {
  const text = await response.text();
  console.error('Drive API error:', response.status, text);
  process.exit(1);
}

const data = await response.json();
const items = (data.files || []).map((file) => ({
  title: String(file.name || 'Fotka').replace(/\.[^.]+$/, ''),
  image: `https://drive.google.com/thumbnail?id=${file.id}&sz=w1600`,
  id: file.id,
  modified: file.modifiedTime || ''
}));

const payload = JSON.stringify({ items }, null, 2) + '\n';
writeFileSync(join(ROOT, 'data', 'portfolio-page.json'), payload);
writeFileSync(join(ROOT, 'data', 'portfolio.json'), payload);

console.log(`Hotovo: ${items.length} fotiek → data/portfolio-page.json`);
items.forEach((item, i) => console.log(`  ${i + 1}. ${item.title}`));
