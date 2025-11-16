# Bergendal Monorepo

This is a monorepo containing the Bergendal frontend and CMS packages.

## Structure

```
bergendal.dk/
├── packages/
│   ├── sveltekit/    # Frontend application
│   └── sanity/       # CMS with Sanity
├── package.json      # Root workspace configuration
├── pnpm-workspace.yaml
└── mprocs.yaml       # Multi-process runner config
```

## Getting Started

### Install dependencies

```bash
pnpm install
```

### Development

Run both frontend and CMS in development mode:

```bash
pnpm dev
```

This uses `mprocs` to run both services simultaneously.

Or run them individually:

```bash
# Run SvelteKit frontend
pnpm dev:sveltekit

# Run Sanity CMS
pnpm dev:sanity
```

### Build

```bash
# Build SvelteKit
pnpm build:sveltekit

# Build Sanity
pnpm build:sanity
```

### Sanity Type Generation

Generate TypeScript types from Sanity schema:

```bash
pnpm typegen:sanity
```

This will generate `sanity.types.ts` in the sanity package.

### Code Formatting

Format all code in the monorepo:

```bash
# Format all files
pnpm format

# Check formatting without making changes
pnpm format:check
```

The project uses Prettier with the following settings:
- No semicolons
- Double quotes
- 2 space indentation
- 100 character line width
- LF line endings

### Deploy

```bash
# Deploy Sanity CMS
pnpm deploy:sanity
```

## Importing Sanity Types

The `@sanity-types` alias is configured to import types from the Sanity package. Use it in your SvelteKit app:

```typescript
import type { YourSanityType } from "@sanity-types"
```

The alias is configured in both `svelte.config.js` and `vite.config.ts` to point to `../sanity/sanity.types.ts`.

## Package Management

This monorepo uses pnpm workspaces. To add dependencies:

```bash
# Add to a specific package
pnpm --filter sveltekit add <package>
pnpm --filter sanity add <package>

# Add to root
pnpm add -w <package>
```
