# Testing Setup and Strategy

## Stack

| Tool | Version | Purpose |
|---|---|---|
| `vitest` | ^4.1.1 | Test runner |
| `@nuxt/test-utils` | ^4.0.0 | Nuxt-aware mounting helpers |
| `@vue/test-utils` | ^2.4.6 | Low-level Vue component utilities |
| `happy-dom` | ^20.8.7 | DOM environment for tests |

## Running Tests

```bash
npm test          # watch mode
npm run test:run  # single run (CI)
```

## Configuration

**`vitest.config.ts`** — uses `defineVitestConfig` from `@nuxt/test-utils/config` with `environment: 'nuxt'`. This boots a Nuxt context so auto-imports and `UAlert`/other Nuxt UI components resolve correctly.

## Test Location & Naming

- Test files live in `tests/` mirroring the `app/` structure:
  - `tests/components/` — component tests
  - `tests/pages/` — page-level tests (future)
- File naming: `*.test.ts`

## Writing Tests

Use `mountSuspended` from `@nuxt/test-utils/runtime` for components that may use async setup or Nuxt composables:

```typescript
import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import MyComponent from '~/components/MyComponent.vue'

describe('MyComponent', () => {
  it('renders slot content', async () => {
    const wrapper = await mountSuspended(MyComponent, {
      slots: { default: 'Hello' },
    })
    expect(wrapper.text()).toContain('Hello')
  })
})
```

**Path alias**: `~` resolves to `app/` (Nuxt 4 `srcDir`). Use `~/components/Foo.vue`, not `~/app/components/Foo.vue`.

## Existing Tests

| File | What it covers |
|---|---|
| `tests/components/Alert.test.ts` | Slot rendering, default color, custom color prop |

## Red-Green-Refactor Pattern

1. **Red** — write a failing test describing the desired behaviour
2. **Green** — write the minimum code to make it pass
3. **Refactor** — clean up while keeping tests green (`npm run test:run`)
