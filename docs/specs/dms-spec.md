# Especificação - Document Management System

> Especificação gerada a partir de `docs/specs/spec-template.md` (Passo 1 -
> Spec Driven Development). Cobre requisitos, modelo de dados, contratos de
> API e plano de execução para o DMS.

## 1. Objetivo

Fornecer um sistema web simples para que cada usuário envie, liste e baixe
seus documentos, com arquivos armazenados localmente no filesystem da
aplicação.

## 2. Escopo

### Dentro do escopo

- Upload de documentos
- Listagem de documentos
- Download de documentos
- Gestão simples por usuário (identificação via header, sem autenticação)

### Fora do escopo

- Armazenamento externo ou em nuvem
- Versionamento de documentos
- Autenticação/autorização real (login, senha, tokens)
- Filtros, paginação ou busca na listagem
- Restrições de tipo ou tamanho de arquivo

## 3. Requisitos funcionais

| ID    | Requisito                                                                |
| ----- | ------------------------------------------------------------------------- |
| RF-01 | O usuário pode enviar um documento via `POST /upload`                     |
| RF-02 | O usuário pode listar todos os documentos enviados via `GET /documents`   |
| RF-03 | O usuário pode baixar um documento pelo identificador                     |
| RF-04 | O usuário é identificado pelo header `x-user-id` em cada requisição       |
| RF-05 | O upload é rejeitado se faltar o arquivo ou o header `x-user-id`          |
| RF-06 | O download retorna erro se o identificador do documento não existir       |

## 4. Requisitos não funcionais

| ID     | Requisito                                                            |
| ------ | --------------------------------------------------------------------- |
| RNF-01 | Arquivos gravados no filesystem local (`backend/storage`) via multer com `diskStorage` |
| RNF-02 | Metadados dos documentos mantidos em memória nesta fase                |
| RNF-03 | Configuração via variáveis de ambiente (ex.: porta do servidor), conforme 12-Factor App |
| RNF-04 | Backend organizado em Clean Architecture simples, com fluxo de dependência unidirecional `routes -> controllers -> services -> repositories` |
| RNF-05 | Sem restrição de tipo ou tamanho de arquivo nesta fase                 |

## 5. Modelo de dados (metadados do documento)

| Campo        | Tipo   | Descrição                                                |
| ------------ | ------ | --------------------------------------------------------- |
| id           | string | Identificador único do documento (gerado com `crypto.randomUUID()`) |
| originalName | string | Nome original do arquivo enviado pelo usuário              |
| storedName   | string | Nome do arquivo gravado em disco pelo multer                |
| mimeType     | string | Tipo MIME do arquivo enviado                                |
| size         | number | Tamanho em bytes                                            |
| uploadedAt   | string | Data/hora do upload (ISO 8601)                              |
| owner        | string | Identificador do usuário dono, obtido do header `x-user-id` |

## 6. Contratos de API

### POST /upload

- Header obrigatório: `x-user-id` (identifica o dono do documento)
- Entrada: arquivo no campo `file` (multipart/form-data)
- Saída (201): metadados do documento criado (ver seção 5)
- Erros:
  - 400: header `x-user-id` ausente ou arquivo não enviado

### GET /documents

- Header: nenhum obrigatório
- Saída (200): lista com os metadados de todos os documentos, sem filtro por owner

### GET /documents/:id/download

- Entrada: `id` do documento na URL
- Saída (200): conteúdo binário do arquivo, com headers `Content-Type` e
  `Content-Disposition` apropriados
- Erros:
  - 404: nenhum documento encontrado com o `id` informado

## 7. Decisões arquiteturais

- Backend em Clean Architecture simples (`routes`, `controllers`, `services`,
  `repositories`), camadas internas não conhecem camadas externas
- Repositório de metadados mantém os dados em memória; repositório de
  arquivos usa multer com `diskStorage` gravando em `backend/storage`
- Identificação do usuário via header `x-user-id`, sem autenticação real
- Frontend baseado em componentes React, consumindo o backend via `fetch`
  através do prefixo `/api` (proxy do Vite)
- Armazenamento estritamente local, sem provedores externos

## 8. Plano de execução

1. Backend — implementar a camada de repositórios (metadados em memória e
   armazenamento em disco com multer `diskStorage`)
2. Backend — implementar a camada de serviços com as regras de negócio de
   upload, listagem e download
3. Backend — implementar os controllers, com validação de entrada HTTP
   (header `x-user-id`, presença do arquivo, existência do documento)
4. Backend — implementar as rotas (`POST /upload`, `GET /documents`,
   `GET /documents/:id/download`) e os testes com `node:test`
5. Frontend — implementar o serviço de API (`services/`) para consumir os
   três endpoints do backend
6. Frontend — implementar os componentes/páginas de upload e de
   listagem/download dos documentos
7. Testes manuais/integrados de ponta a ponta cobrindo os fluxos de upload,
   listagem e download
