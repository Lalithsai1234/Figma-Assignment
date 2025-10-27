# Figma Assignment

A React + Vite + TypeScript project styled with Tailwind CSS. Implements two widgets on the right side (Tabs and Gallery) to match the provided mock.

## Scripts
- `npm run dev` – start local dev server
- `npm run build` – production build
- `npm run preview` – preview build
- `npm run typecheck` – TypeScript check
- `npm run lint` – ESLint

## Environment
This project includes optional Supabase integration for the gallery images. Add the following to a `.env` file if you want remote data:
```
VITE_SUPABASE_URL=your-url
VITE_SUPABASE_ANON_KEY=your-key
```

## Deploy
Any static host (Vercel/Netlify/etc.) can deploy the `dist/` directory after `npm run build`.
