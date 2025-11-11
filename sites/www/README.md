# Gittes Glamping – Frontend

Instruktionen her beskriver, hvordan du starter hele projektet (backend + frontend) ved brug af VS Code’s **NPM Scripts** sidepanel. Alternativt kan du køre de samme kommandoer i en terminal – begge dele er beskrevet.

## Forudsætninger

- Node.js 20+
- NPM (følger normalt med Node)
- Valgfrit: MongoDB kørende lokalt (kræves til backend-data)

## Struktur

```
glamping/
├── package.json          # Backend scripts
├── index.js              # Backend entry (Express server)
└── sites/www/            # Frontend (React + Vite)
    └── package.json      # Frontend scripts
```

## Hurtig opstart via VS Code NPM Scripts

1. **Åbn mappen `glamping/` i VS Code.**
2. Find panellet **NPM Scripts** (i Explorer eller via `View → Panels → NPM Scripts`). Her ligger scripts for både backend og frontend.
3. **Installér afhængigheder**
   - Under `glamping/package.json`: dobbeltklik på `install`.
   - Under `glamping/sites/www/package.json`: dobbeltklik på `install`.
4. **Klargør backend**
   - Opret `.env.local` i roden (`glamping/.env.local`) og indsæt de værdier, der er beskrevet i root-README’en.
   - (Valgfrit) Kør `Opret Database` for at seed’e eksempeldata.
5. **Start backend-serveren**
   - I NPM Scripts under `glamping/package.json`, vælg `Start Server` (kører `nodemon index`). Serveren lytter på `http://localhost:3042`.
6. **Start frontend-dev-serveren**
   - I NPM Scripts under `glamping/sites/www/package.json`, vælg `dev` (kører `vite`). Frontenden kører på `http://localhost:5173` som standard.
7. Besøg frontenden i browseren. Alle API-kald rammer nu backend-serveren, der allerede kører.

## Alternativ (terminal)

```bash
# Backend
cd glamping
npm install
cp .env.local.example .env.local   # hvis du har en skabelon
npm run "Opret Database"          # frivilligt seed
npm run start                      # starter nodemon

# Frontend
cd sites/www
npm install
npm run dev
```

## Login-oplysninger

Default-brugere fra seeding:

- **Admin:** `admin@mediacollege.dk` / `admin`
- **Guest:** `guest@mediacollege.dk` / `guest`

Admin får adgang til CRUD på aktiviteter; Guest kan gemme favoritter ("Min liste").

## Scripts

- `npm run dev` – Vite udviklingsserver
- `npm run build` – Production build (output i `dist/`)
- `npm run preview` – Viser et build lokalt
- `npm run lint` – ESLint kontrol

> Husk at backend-serveren skal køre, før frontenden kan hente data.
