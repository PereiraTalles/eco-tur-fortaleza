# Documentação da API — Eco Tur Fortaleza

Este documento descreve as rotas disponibilizadas pelo backend do sistema EcoTur Fortaleza.  
A API fornece os dados dos pontos turísticos ecológicos utilizados pelo frontend.

## Base URL 

Desenvolvimento (local):
http://localhost:5173

Produção (Render):
https://eco-tur-fortaleza.onrender.com

## Health
GET `/health` Retorna se o backend está ativo. → Resposta 200 `200 { "status": "ok", "service": "eco-tur-backend" }`

GET `/db-health` Verifica a conexão com o banco.

Resposta 200 → `200 { "db": "ok" }` ou Resposta 500 `500 { "db": "fail" }`

---

## Spots
Rotas de Pontos Turísticos (/api/spots)
GET /api/spots

Lista os pontos turísticos ecológicos cadastrados no sistema.
Permite aplicar filtros e paginação por meio de parâmetros de consulta (query params).

Parâmetros opcionais:

category: filtra pela categoria do ponto (ex.: "praia", "parque", "trilha")

district: filtra pelo bairro/localização (ex.: "Praia do Futuro")

q: termo de busca no nome ou descrição

limit: quantidade de registros por página (ex.: 10, 20)

offset: deslocamento para paginação (início da busca)

Exemplo de requisição com filtros:

/api/spots?category=praia&district=Praia%20do%20Futuro&q=mar&limit=20&offset=0

Resposta 200 (exemplo):

{
"data": [
{
"id": x,
"name": "Nome do local",
"category": "praia ou cidade",
"district": "bairro",
"rating": 4.5,
"latitude": -3.7265,
"longitude": -38.5003,
"url_imagem": "https://exemplo.com/imagem.jpg
",
"created_at": "2025-11-10T00:00:00.000Z"
}
],
"meta": {
"total": 12,
"page": 1,
"totalPages": 6,
"limit": 20,
"offset": 0
}
}

**Resposta 200**
```json
{
  "data": [
    { "id": 1, "name": "Praia do Futuro", "category": "praia", "district": "Praia do Futuro", "rating": 4.5, "created_at": "2025-11-10T00:00:00.000Z", "latitude": -3.7265, "longitude": -38.5003, "url_imagem": "https://exemplo.com/imagem.jpg" }
  ],
  "meta": { "total": 12, "page": 1, "totalPages": 6, "limit": 2, "offset": 0 }
}
