# EcoTur Fortaleza

O EcoTur Fortaleza é um sistema multiplataforma criado para ajudar moradores e visitantes a encontrarem pontos de turismo ecológico em Fortaleza.  
O projeto contribui para o ODS 11 (Cidades e Comunidades Sustentáveis), oferecendo uma forma simples e organizada de descobrir locais naturais, parques, praias e espaços sustentáveis na cidade.

## Funcionalidades Implementadas

- Listagem de pontos turísticos ecológicos de Fortaleza  
- Filtro por categoria (ex.: praias, parques, trilhas)  
- Filtro por localização/bairro  
- Busca por nome ou palavra-chave  
- Visualização dos detalhes de cada ponto  
- Interface simples e fácil de usar  

## Tecnologias e Linguagens Utilizadas

### Linguagens
- JavaScript  
- TypeScript (se usado no frontend)  
- SQL (para o banco PostgreSQL)

### Tecnologias
- **Frontend:** React  
- **Backend:** Node.js e Express  
- **Banco de Dados:** PostgreSQL  
- **Deploy do Frontend:** Vercel  
- **Deploy do Backend:** Render  

### Ferramentas
- Git e GitHub  
- Postman (testes de API)

## Arquitetura do Sistema

O sistema é dividido em três partes principais:

1. **Frontend (React):**
   - Interface onde o usuário visualiza e interage com os pontos turísticos ecológicos.
   - Faz requisições para a API do backend.

2. **Backend (Node.js + Express):**
   - Recebe as requisições do frontend.
   - Processa dados, regras e validações.
   - Conecta-se ao banco de dados para buscar ou salvar informações.

3. **Banco de Dados (PostgreSQL):**
   - Armazena os pontos turísticos e suas informações.
   - Fornece dados para o backend por meio de consultas SQL.

A comunicação funciona assim:
Frontend ➝ Backend (API REST) ➝ Banco de Dados  
Backend ➝ Frontend (retorno das informações em JSON)

## Instruções de Instalação e Execução

### 1. Clonar o repositório
```bash
    git clone https://github.com/PereiraTalles/eco-tur-fortaleza
    cd eco-tur-fortaleza
```
### 2. Backend
```bash
    cd backend
    npm install
    npm start 
```
### 3. Frontend
```bash
    cd frontend/web
    npm install
    npm start 
```
### 4. Banco de Dados

- Criar um banco PostgreSQL  
- Executar o arquivo `database/schema.sql` para criar as tabelas  

### 5. Acesso em Produção

- Frontend: https://eco-tur-fortaleza.vercel.app  
- Backend: https://eco-tur-fortaleza.onrender.com  
