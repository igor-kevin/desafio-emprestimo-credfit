# Sistema de Empréstimo Consignado

Este é um sistema de empréstimo consignado desenvolvido com Nest. js no backend e React no front. O sistema permite que o funcionário de uma empresa conveniada solicite um empréstimo consignado com base em seus salários.

## Funcionalidades

- Seleção de valor do empréstimo via slider
- Cálculo do valor máximo do empréstimo com base no salário
- Seleciona o número de parcelas a ser financiado.
- Verificação do Score do funcionário via API externa.
- Acompanhamento do status da soliticação de empréstimo via API externa.
- Listagem de empréstimos

## Instalação

### Backend

    1. Clone o repositório do git:
        https://github.com/igor-kevin/desafio-emprestimo-credfit
    2. Entre no diretório do backend:
         cd backend
    instale as dependencias:
        npm install
    3. Configure as variáveis do banco de dados criando um arquivo '.env' seguindo o exemplo:
        DATABASE_HOST=localhost
        DATABASE_PORT=5432
        DATABASE_USERNAME=postgres
        DATABASE_PASSWORD=postgres
        DATABASE_NAME= nome_do_seu_db
    4. Inicie o servidor:
         npm run start:dev

### Frontend

    1. Em outro terminal entre no diretório do frontend
        cd frontend
    2. Instale as dependencias:
        npm install
    3. Inicie o cliente:
        npm run dev
    Acesse o aplicativo em seu navegador em http://localhost:5173
