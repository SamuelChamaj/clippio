import fs from 'node:fs/promises';
import { SpreadsheetFile, Workbook } from '@oai/artifact-tool';

const outputDir = 'outputs/google-sheet-alert-template';
const outputPath = `${outputDir}/Oznamy_Clippio_Template.xlsx`;

await fs.mkdir(outputDir, { recursive: true });

const workbook = Workbook.create();
const alerts = workbook.worksheets.add('Oznamy');
const guide = workbook.worksheets.add('Navod');

alerts.showGridLines = false;
guide.showGridLines = false;

alerts.getRange('A1:J1').values = [[
  'aktivne',
  'typ',
  'nadpis',
  'sprava',
  'zobrazit_od',
  'zobrazit_do',
  'priorita',
  'poznamka',
  'posledna_uprava',
  'web_id',
]];

alerts.getRange('A2:J4').values = [
  [
    'ano',
    'warning',
    'Docasna dostupnost',
    'Najblizsie dni mozem odpovedat pomalsie. Napis mi alebo zavolaj a ozvem sa hned, ako to bude mozne.',
    new Date('2026-09-01'),
    new Date('2026-09-08'),
    1,
    'Ukazkovy aktivny oznam pre dovolenku alebo cas mimo domu.',
    new Date('2026-09-01'),
    'homepage-main',
  ],
  [
    'nie',
    'info',
    'Bez obmedzeni',
    'Som dostupny bez obmedzeni.',
    null,
    null,
    2,
    'Rezervny vypnuty oznam.',
    new Date('2026-09-01'),
    'homepage-main',
  ],
  [
    'nie',
    'success',
    'Volne terminy',
    'Aktualne mam volne terminy na fotenie aj video.',
    null,
    null,
    3,
    'Volitelny pozitivny oznam.',
    new Date('2026-09-01'),
    'homepage-main',
  ],
];

alerts.getRange('A1:J1').format = {
  fill: '#09213F',
  font: { bold: true, color: '#FFFFFF' },
};
alerts.getRange('A1:J4').format.borders = {
  insideHorizontal: { style: 'thin', color: '#D8E3F2' },
  bottom: { style: 'thin', color: '#9CB7D4' },
};
alerts.getRange('A2:J4').format = {
  fill: '#F8FBFF',
  font: { color: '#0B1220' },
};
alerts.getRange('A2:A4').dataValidation = {
  rule: { type: 'list', values: ['ano', 'nie'] },
};
alerts.getRange('B2:B4').dataValidation = {
  rule: { type: 'list', values: ['warning', 'info', 'success'] },
};
alerts.getRange('E2:F4').setNumberFormat('yyyy-mm-dd');
alerts.getRange('I2:I4').setNumberFormat('yyyy-mm-dd');
alerts.getRange('G2:G4').format.numberFormat = '0';
alerts.getRange('A1:J4').format.wrapText = true;
alerts.getRange('A:A').format.columnWidth = 11;
alerts.getRange('B:B').format.columnWidth = 12;
alerts.getRange('C:C').format.columnWidth = 24;
alerts.getRange('D:D').format.columnWidth = 62;
alerts.getRange('E:F').format.columnWidth = 15;
alerts.getRange('G:G').format.columnWidth = 10;
alerts.getRange('H:H').format.columnWidth = 42;
alerts.getRange('I:I').format.columnWidth = 17;
alerts.getRange('J:J').format.columnWidth = 18;
alerts.getRange('1:1').format.rowHeight = 26;
alerts.getRange('2:4').format.rowHeight = 62;
alerts.freezePanes.freezeRows(1);
alerts.tables.add('A1:J4', true, 'ClippioAlerts');

guide.getRange('A1:F1').merge();
guide.getRange('A1:F1').values = [['Clippio oznamy pre web']];
guide.getRange('A1:F1').format = {
  fill: '#09213F',
  font: { bold: true, color: '#FFFFFF', size: 18 },
};
guide.getRange('A3:B10').values = [
  ['Co menit', 'Ako to funguje'],
  ['aktivne', 'ano = oznam sa moze zobrazit, nie = oznam je vypnuty'],
  ['typ', 'warning, info alebo success. Podla toho sa neskor zmeni farba alertu.'],
  ['nadpis', 'Kratky titulok v ozname.'],
  ['sprava', 'Text, ktory uvidia navstevnici webu.'],
  ['zobrazit_od / zobrazit_do', 'Volitelne datumy, kedy ma oznam platit.'],
  ['priorita', 'Ak bude aktivnych viac oznamov, nizsie cislo ma prednost.'],
  ['web_id', 'Nechaj homepage-main, kym nebudeme riesit viac miest na webe.'],
];
guide.getRange('A3:B3').format = {
  fill: '#EAF3FF',
  font: { bold: true, color: '#09213F' },
};
guide.getRange('A3:B10').format.borders = {
  insideHorizontal: { style: 'thin', color: '#D8E3F2' },
  bottom: { style: 'thin', color: '#9CB7D4' },
};
guide.getRange('A:B').format.wrapText = true;
guide.getRange('A:A').format.columnWidth = 24;
guide.getRange('B:B').format.columnWidth = 78;
guide.getRange('1:1').format.rowHeight = 34;
guide.getRange('3:10').format.rowHeight = 42;

const alertsPreview = await workbook.render({
  sheetName: 'Oznamy',
  autoCrop: 'all',
  scale: 1,
  format: 'png',
});
await fs.writeFile(`${outputDir}/oznamy-preview.png`, new Uint8Array(await alertsPreview.arrayBuffer()));

const guidePreview = await workbook.render({
  sheetName: 'Navod',
  autoCrop: 'all',
  scale: 1,
  format: 'png',
});
await fs.writeFile(`${outputDir}/navod-preview.png`, new Uint8Array(await guidePreview.arrayBuffer()));

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);
console.log(outputPath);
process.exit(0);
