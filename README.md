# ⚽ Zustand FC

Projeto de estudo focado em **gerenciamento de estado com Zustand** utilizando **React + TypeScript**.

O domínio da aplicação é um gerenciador de elenco e escalação de um time de futebol society. A ideia é manter uma aplicação simples o suficiente para estudar gerenciamento de estado, mas rica o bastante para explorar recursos avançados do Zustand utilizados em aplicações reais.

---

## 📚 Objetivo

Aprender e documentar, de forma incremental, os principais conceitos do Zustand através de commits pequenos e organizados.

Ao longo do desenvolvimento serão explorados desde os conceitos básicos até padrões avançados encontrados em projetos profissionais.

---

## 🚀 Funcionalidades

- ✅ Cadastro de jogadores
- ✅ Edição de jogadores
- ✅ Remoção de jogadores
- ✅ Importação assíncrona de elenco (API mockada)
- ✅ Criação de formações táticas
  - 4-3-3
  - 4-4-2
  - 3-4-3
  - 2-3-1
- ✅ Escalação dos jogadores por Drag and Drop
- ✅ Estatísticas da formação em tempo real
  - Média de rating
  - Formação completa ou incompleta
  - Posição mais fraca
- ✅ Undo / Redo das alterações na escalação
- ✅ Persistência dos dados utilizando Local Storage
- ✅ Integração com Redux DevTools

---

## 🧠 Conceitos do Zustand estudados

| Conceito | Aplicação |
|----------|-----------|
| `create()` | Criação da store |
| Selectors | Renderizações otimizadas |
| Actions | Alterações de estado |
| Async Actions | Importação de jogadores |
| `persist` | Persistência no Local Storage |
| `devtools` | Integração com Redux DevTools |
| `immer` | Atualização de estados aninhados |
| `temporal (zundo)` | Undo / Redo |
| Store Slices | Organização da store |
| Comunicação entre slices | Utilização do `get()` |
| Estado derivado | `useMemo` + funções utilitárias |
| Testes da store | Vitest |

---

## 🛠 Tecnologias

- React
- TypeScript
- Vite
- Zustand
- Immer
- Zundo
- @dnd-kit/core
- Vitest

---

## 📂 Estrutura do projeto

```text
src
├── components
│   ├── Formation
│   ├── PlayerList
│   ├── Stats
│   └── UI
│
├── hooks
│   └── useRenderCount.ts
│
├── mocks
│   └── fetchPlayers.ts
│
├── store
│   ├── slices
│   │   ├── createPlayersSlice.ts
│   │   ├── createFormationsSlice.ts
│   │   ├── createImportSlice.ts
│   │   └── index.ts
│   │
│   ├── types.ts
│   └── useAppStore.ts
│
├── types
│   ├── Player.ts
│   └── FieldPosition.ts
│
├── utils
│   └── calculateFormationStats.ts
│
├── App.tsx
└── main.tsx

docs
└── anotacoes
    ├── seletores-e-re-renders.md
```

---

## ▶️ Executando o projeto

### Instalar dependências

```bash
npm install
```

### Executar em desenvolvimento

```bash
npm run dev
```

### Executar os testes

```bash
npm test
```

---

## 📖 Roadmap de aprendizado

- [x] Store básica
- [x] Selectors
- [x] Actions
- [x] Persist
- [x] DevTools
- [x] Store Slices
- [x] Async Actions
- [x] Immer
- [x] Drag and Drop
- [x] Undo / Redo
- [x] Testes unitários
- [x] Deploy

---

## 💡 O que este projeto demonstra

Este projeto foi desenvolvido com foco em aprendizado, mas seguindo padrões encontrados em aplicações reais.

Durante o desenvolvimento são praticados conceitos como:

- Organização de stores complexas
- Separação por slices
- Gerenciamento de estado global
- Atualizações imutáveis
- Otimização de renderizações
- Integração com middlewares
- Testes unitários da store
- Código limpo e escalável

---

## 👨‍💻 Autor

Desenvolvido por **Delber Soares** como projeto de estudos para portfólio.

GitHub:
https://github.com/delberssoares