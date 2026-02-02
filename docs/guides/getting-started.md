# Getting Started

This guide will help you set up your development environment and get started with Flyfront. Whether you're joining an existing project or creating a new one from scratch, this guide covers everything you need.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Option A: Clone Existing Flyfront Repository](#option-a-clone-existing-flyfront-repository)
- [Option B: Create New Nx Workspace from Scratch](#option-b-create-new-nx-workspace-from-scratch)
- [Project Overview](#project-overview)
- [Running the Application](#running-the-application)
- [Essential Nx Commands](#essential-nx-commands)
- [Making Your First Change](#making-your-first-change)
- [Understanding the Workflow](#understanding-the-workflow)
- [Next Steps](#next-steps)

---

## Prerequisites

Before you begin, ensure you have the following installed on your development machine:

### Required Software

| Software | Minimum Version | Recommended | Installation |
|----------|----------------|-------------|--------------|
| **Node.js** | 20.x | 22.x LTS | [nodejs.org](https://nodejs.org/) |
| **npm** | 10.x | Latest | Included with Node.js |
| **Git** | 2.x | Latest | [git-scm.com](https://git-scm.com/) |

### Verify Installation

Run these commands to verify your setup:

```bash
# Check Node.js version
node --version
# Expected: v20.x.x or higher

# Check npm version
npm --version
# Expected: 10.x.x or higher

# Check Git version
git --version
# Expected: git version 2.x.x or higher
```

### Recommended Tools

| Tool | Purpose |
|------|---------|
| **VS Code** | Recommended IDE with excellent Angular/TypeScript support |
| **Nx Console** | VS Code extension for running Nx commands |
| **Angular Language Service** | VS Code extension for Angular IntelliSense |
| **Prettier** | Code formatting extension |
| **ESLint** | Linting extension |

#### VS Code Extensions

Install these recommended extensions:

```bash
code --install-extension nrwl.angular-console
code --install-extension angular.ng-template
code --install-extension esbenp.prettier-vscode
code --install-extension dbaeumer.vscode-eslint
code --install-extension bradlc.vscode-tailwindcss
```

---

## Option A: Clone Existing Flyfront Repository

If you're joining a team that already uses Flyfront, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/firefly-oss/flyfront.git
cd flyfront
```

### 2. Install Dependencies

```bash
npm install
```

> **Tip**: This installs dependencies for all projects in the monorepo. Nx handles dependency management efficiently.

### 3. Verify Installation

```bash
# Check Nx version
npx nx --version

# View the project graph
npx nx graph
```

The `nx graph` command opens a browser window showing the dependency relationships between all projects.

---

## Option B: Create New Nx Workspace from Scratch

If you're starting a brand new project and want to use the Flyfront architecture, follow these steps to create an Nx workspace from scratch.

### Step 1: Create the Nx Workspace

```bash
# Create a new Nx workspace with Angular
npx create-nx-workspace@latest my-flyfront-app \
  --preset=angular-monorepo \
  --appName=my-app \
  --style=scss \
  --routing=true \
  --standaloneApi=true \
  --e2eTestRunner=playwright \
  --nxCloud=skip
```

**What each option means:**
- `--preset=angular-monorepo`: Creates an Angular monorepo structure with libs/apps folders
- `--appName=my-app`: Name of your first application
- `--style=scss`: Uses SCSS for styling (required for Tailwind integration)
- `--routing=true`: Includes Angular Router
- `--standaloneApi=true`: Uses modern standalone components (no NgModules)
- `--e2eTestRunner=playwright`: Uses Playwright for end-to-end testing
- `--nxCloud=skip`: Skip Nx Cloud for now (you can enable later)

### Step 2: Navigate to Your Workspace

```bash
cd my-flyfront-app
```

### Step 3: Install TailwindCSS

```bash
# Install Tailwind CSS and dependencies
npm install -D tailwindcss postcss autoprefixer

# Initialize Tailwind configuration
npx tailwindcss init
```

### Step 4: Configure Tailwind

Update `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./apps/**/*.{html,ts}",
    "./libs/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        // Add more custom colors as needed
      },
    },
  },
  plugins: [],
};
```

Add Tailwind directives to your app's `styles.scss`:

```scss
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Step 5: Create Shared Libraries

Create the core library structure that mirrors Flyfront:

```bash
# Create core utilities library
npx nx g @nx/angular:library core \
  --directory=libs/core \
  --buildable=true \
  --publishable=true \
  --importPath=@myapp/core \
  --tags="type:core,scope:shared"

# Create UI component library
npx nx g @nx/angular:library ui \
  --directory=libs/ui \
  --buildable=true \
  --publishable=true \
  --importPath=@myapp/ui \
  --tags="type:ui,scope:shared"

# Create authentication library
npx nx g @nx/angular:library auth \
  --directory=libs/auth \
  --buildable=true \
  --publishable=true \
  --importPath=@myapp/auth \
  --tags="type:feature,scope:auth"

# Create data access library
npx nx g @nx/angular:library data-access \
  --directory=libs/data-access \
  --buildable=true \
  --publishable=true \
  --importPath=@myapp/data-access \
  --tags="type:data-access,scope:shared"
```

### Step 6: Set Up Path Mappings

Verify `tsconfig.base.json` has the path mappings:

```json
{
  "compilerOptions": {
    "paths": {
      "@myapp/core": ["libs/core/src/index.ts"],
      "@myapp/ui": ["libs/ui/src/index.ts"],
      "@myapp/auth": ["libs/auth/src/index.ts"],
      "@myapp/data-access": ["libs/data-access/src/index.ts"]
    }
  }
}
```

### Step 7: Configure Dependency Rules

Add dependency rules to `nx.json` to enforce architecture:

```json
{
  "enforce-module-boundaries": [
    {
      "sourceTag": "type:app",
      "onlyDependOnLibsWithTags": ["type:feature", "type:ui", "type:core", "type:data-access"]
    },
    {
      "sourceTag": "type:feature",
      "onlyDependOnLibsWithTags": ["type:ui", "type:core", "type:data-access"]
    },
    {
      "sourceTag": "type:ui",
      "onlyDependOnLibsWithTags": ["type:core"]
    },
    {
      "sourceTag": "type:data-access",
      "onlyDependOnLibsWithTags": ["type:core"]
    },
    {
      "sourceTag": "type:core",
      "onlyDependOnLibsWithTags": []
    }
  ]
}
```

### Step 8: Verify Your Setup

```bash
# Start the development server
npx nx serve my-app

# View the dependency graph
npx nx graph

# Run all tests
npx nx run-many -t test

# Run linting
npx nx run-many -t lint
```

### Workspace Structure After Setup

```
my-flyfront-app/
├── apps/
│   ├── my-app/              # Main application
│   └── my-app-e2e/          # E2E tests
├── libs/
│   ├── core/                # @myapp/core - utilities, services
│   ├── ui/                  # @myapp/ui - UI components
│   ├── auth/                # @myapp/auth - authentication
│   └── data-access/         # @myapp/data-access - API services
├── nx.json                  # Nx configuration
├── tsconfig.base.json       # TypeScript path mappings
├── tailwind.config.js       # Tailwind configuration
└── package.json             # Dependencies
```

---

## Project Overview

After installation, you'll have this structure:

```
flyfront/
├── apps/                    # Applications
│   └── demo-app/           # Demo showcase application
├── libs/                    # Shared libraries
│   ├── core/               # Core utilities (@flyfront/core)
│   ├── ui/                 # UI components (@flyfront/ui)
│   ├── auth/               # Authentication (@flyfront/auth)
│   └── ...                 # Other libraries
├── docs/                    # Documentation
├── nx.json                  # Nx configuration
└── package.json            # Root dependencies
```

### Key Files

| File | Purpose |
|------|---------|
| `nx.json` | Nx workspace configuration, caching, and task runner settings |
| `tsconfig.base.json` | Base TypeScript configuration with path mappings |
| `tailwind.config.js` | TailwindCSS design tokens and theme |
| `package.json` | Root dependencies and npm scripts |

---

## Running the Application

### Start Development Server

```bash
# Using npm script
npm start

# Or using Nx directly
npx nx serve demo-app
```

The application will be available at **http://localhost:4200**.

### Development Server Features

- **Hot Module Replacement**: Changes are reflected instantly
- **TypeScript Compilation**: Errors show in the console
- **Source Maps**: Debug TypeScript directly in browser DevTools

---

## Essential Nx Commands

Nx provides powerful commands for managing your monorepo. Here's a comprehensive reference:

### Running Tasks

```bash
# Run a task for a specific project
npx nx <target> <project>
npx nx build demo-app
npx nx test core
npx nx lint ui

# Run a task for all projects
npx nx run-many -t <target>
npx nx run-many -t build
npx nx run-many -t test
npx nx run-many -t lint

# Run a task only for affected projects (based on git changes)
npx nx affected -t <target>
npx nx affected -t test
npx nx affected -t build
```

### Generating Code

```bash
# Generate a new application
npx nx g @nx/angular:application my-new-app

# Generate a new library
npx nx g @nx/angular:library my-lib --directory=libs/my-lib

# Generate a component
npx nx g @nx/angular:component my-component --project=ui

# Generate a service
npx nx g @nx/angular:service my-service --project=core

# Generate a guard
npx nx g @nx/angular:guard my-guard --project=auth
```

### Workspace Analysis

```bash
# View the project dependency graph
npx nx graph

# Show affected projects
npx nx affected --graph

# List all projects
npx nx show projects

# Show project details
npx nx show project demo-app
```

### Build & Serve

```bash
# Start development server
npx nx serve demo-app

# Start with specific port
npx nx serve demo-app --port=4300

# Build for production
npx nx build demo-app --configuration=production

# Build all projects
npx nx run-many -t build --all
```

### Testing

```bash
# Run unit tests
npx nx test core

# Run tests in watch mode
npx nx test core --watch

# Run tests with coverage
npx nx test core --coverage

# Run E2E tests
npx nx e2e demo-app-e2e
```

### Caching & Performance

```bash
# Clear Nx cache
npx nx reset

# Run with verbose output
npx nx build demo-app --verbose

# Skip cache (force re-run)
npx nx build demo-app --skip-nx-cache
```

### Common Task Combinations

```bash
# Full CI check
npx nx run-many -t lint test build

# Check affected before PR
npx nx affected -t lint test build

# Format check
npx nx format:check

# Apply formatting
npx nx format:write
```

---

## Making Your First Change

Let's make a simple change to understand the development workflow.

### 1. Create a New Component

Navigate to the demo app and create a greeting component:

```bash
npx nx g @nx/angular:component --name=greeting --project=demo-app --standalone
```

### 2. Edit the Component

Open `apps/demo-app/src/app/greeting/greeting.component.ts`:

```typescript
import { Component, input } from '@angular/core';
import { ButtonComponent } from '@flyfront/ui';

@Component({
  selector: 'app-greeting',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div class="p-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-primary-600 mb-4">
        Hello, {{ name() }}!
      </h2>
      <p class="text-gray-600 mb-4">
        Welcome to Flyfront - the Firefly frontend architecture.
      </p>
      <fly-button variant="primary" (clicked)="sayHello()">
        Say Hello
      </fly-button>
    </div>
  `,
})
export class GreetingComponent {
  name = input('World');

  sayHello() {
    alert(`Hello from ${this.name()}!`);
  }
}
```

### 3. Use the Component

Add it to your app component:

```typescript
// In app.component.ts
import { GreetingComponent } from './greeting/greeting.component';

@Component({
  imports: [GreetingComponent],
  template: `
    <div class="min-h-screen bg-gray-100 p-8">
      <app-greeting name="Developer" />
    </div>
  `,
})
export class AppComponent {}
```

### 4. See the Results

The development server will automatically reload. Open http://localhost:4200 to see your new component.

---

## Understanding the Workflow

### Import from Libraries

Always import from library public APIs, not internal paths:

```typescript
// Correct: Import from public API
import { ButtonComponent, CardComponent } from '@flyfront/ui';
import { ConfigService, authGuard } from '@flyfront/core';
import { AuthService } from '@flyfront/auth';

// Wrong: Import from internal path
import { ButtonComponent } from '@flyfront/ui/src/lib/components/button';
```

### Running Affected Commands

Nx's affected commands only run tasks for projects affected by your changes:

```bash
# Only test affected projects
npx nx affected -t test

# Only build affected projects
npx nx affected -t build

# Only lint affected projects
npx nx affected -t lint
```

This significantly speeds up CI/CD pipelines.

### Viewing Dependencies

```bash
# Open interactive project graph
npx nx graph

# Show dependencies for a specific project
npx nx graph --focus=demo-app
```

### Caching

Nx caches task results. If you run the same command twice without changes, the second run is instant:

```bash
npx nx build demo-app
# First run: compiles everything

npx nx build demo-app
# Second run: reads from cache (instant)
```

---

## Next Steps

Now that you have Flyfront running, explore these guides:

### Learn the Fundamentals

1. **[Architecture Overview](../architecture/README.md)**: Understand how Flyfront is structured
2. **[Libraries Reference](../architecture/libraries.md)**: Learn about each library

### Build Something

3. **[Creating Applications](creating-applications.md)**: Create a new application
4. **[Design System](design-system.md)**: Use UI components effectively
5. **[Authentication](authentication.md)**: Add user authentication

### Quality & Deployment

6. **[Testing](testing.md)**: Write tests for your code
7. **[Deployment](deployment.md)**: Deploy to production

---

## Troubleshooting

### Common Issues

#### "Module not found" errors

Ensure you're importing from library public APIs:

```typescript
// Check your import paths
import { Something } from '@flyfront/core';  // Correct
import { Something } from 'libs/core/src';   // Wrong
```

#### Port 4200 already in use

```bash
# Use a different port
npx nx serve demo-app --port=4300
```

#### Node modules issues

```bash
# Remove node_modules and reinstall
rm -rf node_modules
npm install
```

#### Nx cache issues

```bash
# Clear Nx cache
npx nx reset
```

### Getting Help

- Check the [FAQ](#troubleshooting) section in relevant guides
- Open an issue on [GitHub](https://github.com/firefly-oss/flyfront/issues)
- Ask in [GitHub Discussions](https://github.com/firefly-oss/flyfront/discussions)
