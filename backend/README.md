# EcoTur Backend — API REST com Node.js, Express e PostgreSQL

Este backend faz parte do projeto **EcoTur Fortaleza**, um sistema de turismo sustentável que permite cadastrar, listar, atualizar e remover pontos turísticos ecológicos de Fortaleza.  
A API foi desenvolvida com foco em **boas práticas, testes automatizados, validações e deploy em produção** no Render.

---

## Tecnologias Utilizadas

- **Node.js (ESM)**
- **Express**
- **PostgreSQL**
- **pg (node-postgres)**
- **Jest + Supertest** (testes automatizados)
- **Render.com** (deploy e hospedagem)
- **dotenv** (variáveis de ambiente)
- **cors**

---

## Estrutura de Pastas

backend/
├── src/
│ ├── app.js # Rotas e lógica principal da API
│ ├── server.js # Inicialização do servidor
│ ├── db.js # Conexão com PostgreSQL
│ ├── seed.js # Popula o banco com dados iniciais
│ ├── validators/
│ │ └── spotValidation.js
│ └── middlewares/
│ └── errors.js
├── database/
│ └── schema.sql # Estrutura do banco de dados
├── tests/
│ ├── spots.test.js
│ ├── spots.validation.test.js
│ ├── health.test.js
│ └── db-health.test.js
├── package.json
├── jest.config.js
└── .env (local)

---

## URL da API em Produção (Render)

**https://eco-tur-fortaleza.onrender.com**

### Endpoints principais:

| Método | Rota | Descrição |
|-------|------|-----------|
| GET | `/health` | Status da API |
| GET | `/db-health` | Status do banco |
| GET | `/api/spots` | Lista com filtros e paginação |
| GET | `/api/spots/:id` | Detalhe de um ponto |
| POST | `/api/spots` | Criar novo ponto turístico |
| PUT | `/api/spots/:id` | Atualizar ponto turístico |
| DELETE | `/api/spots/:id` | Remover ponto turístico |

---

## Banco de Dados (PostgreSQL)

### Tabelas criadas pelo arquivo `database/schema.sql`:

- **spots**
- **users** *(para futuras versões)*
- **reviews** *(para futuras versões)*

Execute o schema manualmente com:
\i database/schema.sql

---

## Seed (Dados Iniciais)
Para inserir dados base automaticamente:
```bash
npm run seed
Dados incluídos automaticamente:
Parque do Cocó
Praia do Futuro
Engenho Velho (Trilha)
Passeio Ciclístico Beira-Mar
Testes Automatizados
Executar todos os testes:

npm test

Os testes cobrem:
Criação de spots
Listagem
Detalhes
Atualização
Exclusão
Validações
Health da aplicação
Health do banco

Variáveis de Ambiente
Arquivo .env local:

PORT=3001
DATABASE_URL=postgres://usuario:senha@localhost:5432/eco_tur


No Render (produção), usar:
DATABASE_URL = <INTERNAL DATABASE URL>
Deploy no Render
Build
npm install

Start
npm start
Service Type
Web Service
Runtime
Node 18+ ou 20+

Funcionalidades da API
✔ Filtros
/api/spots?category=praia
/api/spots?district=Cocó
/api/spots?q=trilha
/api/spots?limit=5&offset=0

Paginação com meta

Retorno:

{
  "data": [...],
  "meta": {
    "total": 8,
    "page": 1,
    "totalPages": 2,
    "limit": 5,
    "offset": 0
  }
}

Validação automática
Nome obrigatório
Categoria obrigatória
Rating entre 0 e 5

Equipe do Projeto

Talles de Lima Pereira — Backend, Banco de Dados, Deploy
Milena — Frontend Web e Mobile
Herison — Frontend Web e Mobile
João — Suporte e documentação