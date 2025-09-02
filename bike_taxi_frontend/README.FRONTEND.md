# Bike Taxi Frontend (Next.js)

- Next.js 15, React 19, TailwindCSS 4
- Theming via CSS variables to match:
  - primary: #1A73E8
  - secondary: #34A853
  - accent: #FFB300

Set API base in `.env`:
NEXT_PUBLIC_API_BASE=http://localhost:3001

Scripts:
- npm run dev
- npm run build
- npm start

Features implemented:
- Auth (login/register)
- User dashboard
- Booking flow
- Real-time tracking (Leaflet map). Uses SSE at /rides/{id}/stream/ when available, otherwise falls back to polling.
- Rides history
- Payments management (wallet top-up and paying pending)
- Driver dashboard (online/offline, accept/complete active ride)
