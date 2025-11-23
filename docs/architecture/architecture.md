# Arquitetura do Sistema

Este documento descreve a arquitetura implementada no projeto EcoTur Fortaleza.  
O sistema foi desenvolvido seguindo uma arquitetura simples, dividida em frontend, backend e banco de dados, garantindo organização, manutenção fácil e comunicação eficiente entre as partes.

## Visão Geral da Arquitetura

O sistema EcoTur Fortaleza utiliza uma arquitetura dividida em três camadas principais:

1. **Frontend (React):**  
   Responsável pela interface e interação do usuário.  
   Ele envia requisições para o backend e exibe os dados retornados.

2. **Backend (Node.js + Express):**  
   Responsável por processar as requisições do frontend.  
   Implementa as regras de negócio e se comunica com o banco de dados.

3. **Banco de Dados (PostgreSQL):**  
   Armazena as informações dos pontos turísticos ecológicos, como nome, descrição, categoria e localização.

## Comunicação entre os Componentes

A comunicação do sistema funciona da seguinte forma:

1. O **frontend** envia requisições HTTP para o backend, pedindo informações dos pontos turísticos.

2. O **backend** recebe essas requisições, processa os dados e consulta o banco de dados quando necessário.

3. O **banco de dados** retorna as informações para o backend, que organiza os dados e responde ao frontend em formato JSON.

4. O **frontend** exibe os dados ao usuário de forma simples e intuitiva.

Fluxo geral:
Frontend → Backend → Banco de Dados  
Backend → Frontend (com os dados)

## Tecnologias Utilizadas na Arquitetura

- **Frontend:**  
  - React  
  - JavaScript ou TypeScript  
  - Consumo de API via HTTP (fetch)

- **Backend:**  
  - Node.js  
  - Express  
  - Rotas REST para comunicação com o frontend

- **Banco de Dados:**  
  - PostgreSQL  
  - SQL para criação e consulta das tabelas

- **Deploy:**  
  - Frontend hospedado na Vercel  
  - Backend hospedado na Render  
