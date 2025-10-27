# Triplist Frontend

Sistema de checklist para viagens - Interface do usuário.

## Tecnologias

- React 18.3.1
- TypeScript 5.6.3
- Vite 5.4.11
- TailwindCSS 3.4.14
- React Router DOM 6.26.2
- TanStack Query 5.59.20
- Axios 1.7.7
- Zustand 5.0.1
- React Hook Form 7.53.1
- Zod 3.23.8

## Estrutura do Projeto

```
src/
├── app/                    # Configuração da aplicação
│   ├── App.tsx            # Componente raiz
│   ├── providers.tsx      # Provedores globais
│   └── router.tsx         # Configuração de rotas
├── assets/                # Recursos estáticos
│   └── styles/           # Estilos globais
├── core/                  # Componentes e lógica compartilhada
│   ├── components/       # Componentes genéricos
│   └── lib/              # Configurações de bibliotecas
├── domain/               # Módulos de domínio
└── pages/                # Páginas da aplicação
    └── layouts/          # Layouts compartilhados
```

## Instalação

```bash
npm install
```

## Configuração

1. Copie o arquivo `.env.example` para `.env`:
```bash
cp .env.example .env
```

2. Configure as variáveis de ambiente conforme necessário.

## Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3001`.

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

## Lint

```bash
npm run lint
```

## Funcionalidades

- ✅ Criação de checklists personalizados para diferentes tipos de viagens
- ✅ Marcação de itens verificados/empacotados
- 🚧 Mais funcionalidades em desenvolvimento

## Arquitetura

O projeto segue uma arquitetura baseada em domínios funcionais:

- **app/**: Configuração central da aplicação
- **core/**: Componentes e utilitários reutilizáveis
- **domain/**: Módulos de negócio organizados por domínio
- **pages/**: Componentes de página e layouts

## Padrões de Código

- TypeScript strict mode habilitado
- Componentes funcionais com hooks
- Gerenciamento de estado com TanStack Query e Zustand
- Validação de formulários com React Hook Form e Zod
- Estilização com TailwindCSS
- Roteamento com React Router DOM

## Contribuição

Para contribuir com o projeto:

1. Crie uma branch para sua feature
2. Faça commit das suas alterações
3. Envie um pull request

## Licença

Projeto privado - Todos os direitos reservados.