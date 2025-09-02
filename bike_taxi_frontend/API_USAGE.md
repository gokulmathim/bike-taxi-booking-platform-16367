Assumed API Endpoints (adjust as needed to match your Django backend)

Base URL
- NEXT_PUBLIC_API_BASE (default: http://localhost:3001)

Auth
- POST /auth/register/ -> { ok } (no strict response required)
- POST /auth/login/ -> { token, user: { role, name, email } }

Users
- GET /users/me/summary/ -> { total_rides, pending_payments, last_ride: { status } }

Rides
- POST /rides/book/ -> { id }
- GET /rides/ -> [ { id, status, fare } ]
- GET /rides/{id}/ -> { id, status, pickup:{lat,lng}, dropoff:{lat,lng}, driver:{name,vehicle}, driver_location:{lat,lng} }
- SSE /rides/{id}/stream/ -> stream of above payloads

Payments
- GET /payments/ -> [ { id, amount, status, ride_id } ]
- POST /payments/wallet/topup/ { amount }
- POST /payments/{paymentId}/pay/

Driver
- GET /driver/me/ -> { status, active_ride:{ id, pickup, dropoff, user_name }, name }
- POST /driver/online/
- POST /driver/offline/
- POST /driver/rides/{id}/accept/
- POST /driver/rides/{id}/complete/

Note: If your backend deviates, update the fetch paths in src/app pages accordingly. Ensure CORS allows the frontend origin and Authorization: Bearer tokens if used.
