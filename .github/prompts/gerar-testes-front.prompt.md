---
description: Gera testes com Vitest e React Testing Library para um componente ou serviço do frontend.
name: gerar-testes-front
argument-hint: caminho do modulo (ex. frontend/src/components/UploadComponent.jsx)
agent: agent
---

# Gerar testes do frontend

Gere testes automatizados para o módulo `${input:modulo:caminho do modulo}` usando Vitest e React Testing Library.

Requisitos:

- Cubra os casos de sucesso e de erro principais (ex.: estados de carregamento, mensagens de erro, interações do usuário).
- Mantenha os testes isolados e legíveis, usando componentes funcionais e hooks como no restante do projeto.
- Coloque os testes em `frontend/test`, espelhando o caminho do módulo original.
- Não faça chamadas de rede reais: mocke `fetch` e o cliente de API em `frontend/src/services`.
- Se o Vitest e a React Testing Library ainda não estiverem no `frontend/package.json`, adicione-os como devDependencies antes de escrever os testes.
