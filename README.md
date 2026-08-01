# CalcMedical

Self-contained medical and surgical calculators built with **Next.js** and **Tailwind CSS**.

## Features

- 20+ clinical calculators (eGFR, EDD/EGA, GCS, Apgar, Parkland, risk scores, and more)
- Static generation per calculator for speed and SEO
- JSON-LD, sitemap, robots (AI crawlers allowed), `llms.txt`
- CLS-safe AdSense slots (`NEXT_PUBLIC_ADSENSE_CLIENT`)
- No accounts; formulas run in the browser

## Develop

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production

```bash
npm run build
npm start
```

Set `NEXT_PUBLIC_SITE_URL` to your canonical domain before deploy.
