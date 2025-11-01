Frontend — React (CRA) + TypeScript + Tailwind

Visão geral
- App SPA que consome a API NestJS (localhost:3000 por padrão).
- Autenticação com JWT: token salvo em localStorage e enviado via header Authorization.
- Controle de acesso por cargo: páginas e itens de menu condicionados a admin/administrador.
- Páginas: Login (/), Produtos (/produtos), Usuários (/usuarios — apenas admin).

Rodando o projeto
1) Instale as dependências
   - `npm install`
2) Inicie em desenvolvimento
   - `npm start`
3) Pré‑requisitos
   - API rodando em `http://localhost:5173` (ajuste em `src/api/api.ts` ou `.env`).

Build
- Gerar build de produção: `npm run build`

Configuração da API
- Arquivo: `src/api/api.ts`
  - Base URL via env var `REACT_APP_API_URL` (ex.: `http://localhost:3000`).
  - Padrão (fallback): `http://localhost:3000` se a env não estiver definida.
  - O helper `setAuthToken(token)` adiciona/limpa o header `Authorization: Bearer <token>` em todas as requisições.

Ambiente (.env)
- Crie um arquivo `.env` na raiz do frontend com:
  - `REACT_APP_API_URL=http://localhost:3000`
- Reinicie o servidor de dev após alterar `.env`.

Autenticação e sessão
- Login (tela `/`): chama `POST /auth/login` e armazena `access_token` no localStorage (`token`).
- Decodificação do JWT: o payload é lido para extrair `id`, `nome`, `cargo` (campo `cargo` define permissões).
- Logout: limpa token e headers; redireciona para `/`.

Rotas e proteção
- `PrivateRoute`: permite acesso apenas quando há token.
- `AdminRoute`: permite acesso apenas se `cargo` for `admin` ou `administrador`.
- Mapeamento:
  - `/` → Login
  - `/produtos` → autenticado (usuários comuns e admin)
  - `/usuarios` → apenas admin/administrador

Páginas principais
- Login (`src/pages/Login.tsx`)
  - Formulário de usuário e senha; após sucesso navega para `/produtos`.
- Produtos (`src/pages/Produtos.tsx`)
  - Lista, cria, edita, exclui produtos do usuário autenticado.
  - Modal `ProductForm` para criar/editar.
- Usuários (`src/pages/Usuarios.tsx`)
  - CRUD de usuários (apenas admin/administrador).
  - Modal `UserForm` para criar/editar (senha opcional ao editar).

Navbar
- Arquivo: `src/components/Navbar.tsx`
- Mostra links para Produtos e (se admin/administrador) Usuários.
- Exibe usuário logado e botão de sair.
- É renderizada no topo das páginas Produtos e Usuários.

Estilos
- Tailwind configurado em `tailwind.config.js` e `postcss.config.js`.
- Container padrão nas páginas com `container mx-auto p-8` logo abaixo do Navbar.

Notas
- A verificação de cargo aceita `admin` e `administrador` (case‑insensitive) no frontend.
- Respostas de erro são exibidas de forma simples via alert/toast.
