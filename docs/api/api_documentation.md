# API — Eco Tur Fortaleza

Base URL (dev): `http://localhost:3001`

## Health
GET `/health` → `200 { "status": "ok", "service": "eco-tur-backend" }`  
GET `/db-health` → `200 { "db": "ok" }` ou `500 { "db": "fail" }`

---

## Spots

### Listar (com filtros e paginação)
GET `/api/spots?category=&district=&q=&limit=20&offset=0`

**Resposta 200**
```json
{
  "data": [
    { "id": 1, "name": "Praia do Futuro", "category": "praia", "district": "Praia do Futuro", "rating": 4.5, "created_at": "2025-11-10T00:00:00.000Z" }
  ],
  "meta": { "total": 12, "page": 1, "totalPages": 6, "limit": 2, "offset": 0 }
}
