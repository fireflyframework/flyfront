# Guides

Step-by-step guides for working with Flyfront. Whether you're new to the framework or an experienced developer, these guides will help you build production-ready applications.

---

## Learning Path

Follow this recommended order to learn Flyfront effectively:

### 1. Foundations (Start Here)

```
┌─────────────────────────────────────────────────────────────┐
│  1. Getting Started                                         │
│     └── Set up environment, understand structure            │
│                           ↓                                 │
│  2. Creating Applications                                   │
│     └── Create your first app from scratch                  │
│                           ↓                                 │
│  3. Design System                                           │
│     └── Use UI components and layouts                       │
└─────────────────────────────────────────────────────────────┘
```

### 2. Core Features

```
┌─────────────────────────────────────────────────────────────┐
│  4. Authentication          5. Data Access                  │
│     └── Login/logout           └── API calls, caching       │
│                                                             │
│  6. State Management        7. Internationalization         │
│     └── Signals, NgRx          └── Multi-language support   │
└─────────────────────────────────────────────────────────────┘
```

### 3. Production Ready

```
┌─────────────────────────────────────────────────────────────┐
│  8. Testing                 9. Deployment                   │
│     └── Unit + E2E             └── Docker, CI/CD            │
└─────────────────────────────────────────────────────────────┘
```

---

## All Guides

### Getting Started
- [Getting Started](getting-started.md) - Set up your development environment, clone or create workspace from scratch
- [Creating Applications](creating-applications.md) - Step-by-step guide to creating new applications

### Building UI
- [Design System](design-system.md) - Using the Flyfront design system, components, and layouts
- [Example Application](example-application.md) - Complete walkthrough building a real application

### Core Features
- [Authentication](authentication.md) - Implementing authentication with OIDC/OAuth2
- [State Management](state-management.md) - Managing application state with signals and NgRx
- [Internationalization](internationalization.md) - Adding multi-language support

### Quality & Testing
- [Testing](testing.md) - Writing and running unit and E2E tests

### Deployment
- [Deployment](deployment.md) - Building and deploying applications to production

---

## Quick Reference

| Task | Guide | Time |
|------|-------|------|
| Set up local development | [Getting Started](getting-started.md) | 15 min |
| Create new Nx workspace from scratch | [Getting Started](getting-started.md#option-b-create-new-nx-workspace-from-scratch) | 30 min |
| Create a new app in existing workspace | [Creating Applications](creating-applications.md) | 10 min |
| Add UI components (buttons, forms, cards) | [Design System](design-system.md) | 20 min |
| Add layouts (auth, dashboard, centered) | [Design System](design-system.md#layouts) | 15 min |
| Implement user login/logout | [Authentication](authentication.md) | 45 min |
| Set up state management | [State Management](state-management.md) | 30 min |
| Add translations | [Internationalization](internationalization.md) | 30 min |
| Write unit tests | [Testing](testing.md) | 30 min |
| Deploy to production | [Deployment](deployment.md) | 20 min |

---

## Common Workflows

### "I want to start a new project from scratch"

1. Read [Getting Started](getting-started.md) - Section "Option B: Create New Nx Workspace"
2. Follow [Creating Applications](creating-applications.md) to add your first app
3. Use [Design System](design-system.md) to build your UI

### "I'm joining an existing Flyfront project"

1. Read [Getting Started](getting-started.md) - Section "Option A: Clone Repository"
2. Review [Architecture Overview](../architecture/README.md) to understand structure
3. Check [Design System](design-system.md) for available components

### "I need to add a new feature"

1. Determine where code belongs using [Dependency Rules](../architecture/dependency-rules.md)
2. Generate code with [Creating Applications](creating-applications.md#adding-features)
3. Add tests following [Testing](testing.md) guide

### "I need to deploy my app"

1. Ensure tests pass: `npx nx run-many -t test`
2. Build for production: `npx nx build my-app --configuration=production`
3. Follow [Deployment](deployment.md) for Docker and CI/CD setup
