# Voz Digital — Landing Page
#vozdigitalit.com
> Landing estática para GitHub Pages. Single-page, scroll-driven, vanilla stack.

## Estructura

```
vozdigital/
├── index.html              ← Single source of truth (markup semántico)
├── assets/
│   ├── css/main.css        ← Estilos vanilla, variables CSS, BEM
│   ├── js/main.js          ← Interactividad: nav, modal, counters, reveal
│   └── img/                ← Logos, favicons, ilustraciones
├── .github/workflows/
│   └── static.yml          ← CI/CD para GitHub Pages
├── CNAME                   ← vozdigitalit.com.ar
└── README.md
```

## Stack

- HTML5 semántico
- CSS3 (Grid, Flexbox, variables, `@media`)
- JavaScript ES2022 vanilla (sin frameworks)
- Google Fonts: Josefin Sans + Roboto
- GitHub Pages (hosting gratuito, HTTPS, CDN)

## Deploy

1. Push a `main`.
2. GitHub Actions ejecuta `static.yml`.
3. Sitio disponible en `https://vozdigitalit.com.ar`.

## Local dev

```bash
python3 -m http.server 8000
# o
npx serve .
```

---
*Voz Digital — 2026*
