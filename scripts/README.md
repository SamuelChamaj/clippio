# Automatické portfólio z Google Drive

## Odporúčané: Google Apps Script (bez pushu pri každej fotke)

1. Otvor [script.google.com](https://script.google.com) → **New project**.
2. Vlož kód zo súboru `drive-portfolio.gs`.
3. Skontroluj `FOLDER_ID` (ID priečinka z URL Drive).
4. **Deploy** → **New deployment** → typ **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Skopíruj URL (vyzerá ako `https://script.google.com/macros/s/...../exec`).
6. V projekte webu otvor `data/portfolio-config.json` a vlož URL do `driveListUrl`.
7. Pushni zmenu na GitHub Pages.

Odteraz: nahráš fotku do Drive priečinka → obnovíš `/portfolio/` → fotka je tam.

> Súbory v Drive musia byť zdieľané aspoň ako „Každý, kto má odkaz“ (view), inak sa thumbnail nenačíta návštevníkom.

## Alternatíva: Node skript (statický JSON)

```bash
export GOOGLE_API_KEY=tvoj_api_kluc
export DRIVE_FOLDER_ID=1VEKAMonI08t7Yo_fKRAgoce0XF49qAh0   # voliteľné
node scripts/generate-portfolio.mjs
git add data/portfolio-page.json data/portfolio.json
git commit -m "Update portfolio from Drive"
git push
```

API kľúč: Google Cloud Console → APIs → enable **Google Drive API** → Credentials → API key (obmedz na Drive API).
