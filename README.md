# SvelteKit MF2

A localization library for SvelteKit based on @sveltekit-i18n/base and Message Format 2.

## Installation
```bash
npm install sveltekit-mf2
```


## Setup

### 1. Create your translations configuration

Create `src/lib/translations.ts`:
```typescript
import i18n from "@sveltekit-i18n/base";

const config = {
  loaders: [
    {
      locale: "en",
      key: "common",
      loader: async () => (await import("./en/common.json")).default,
    },
    {
      locale: "es",
      key: "common",
      loader: async () => (await import("./es/common.json")).default,
    },
    // Add more locales as needed
  ],
  parser: {
    parse(value: string, [props]: Record<string, any>[], locale: string) {
      return { value, props, locale };
    }
  } 
};

export const { setLocale, t, locale, locales, loading, loadTranslations } = new i18n(config);
```

### 2. Create translation files

Create `src/lib/en/common.json`:
```json
{
  "greeting": "Hello {#bold}{$name}!{/bold}",
  "farewell": "Goodbye {#italic}{$name}{/italic}"
}
```

Create `src/lib/es/common.json`:
```json
{
  "greeting": "¡Hola {#bold}{$name}!{/bold}",
  "farewell": "Adiós {#italic}{$name}{/italic}"
}
```

### 3. Load translations in your layout
```typescript
// src/routes/+layout.ts
import { loadTranslations } from '$lib/translations';

export const load = async ({ url }) => {
  const { pathname } = url;
  const initLocale = 'en'; 
  await loadTranslations(initLocale, pathname); 
  return {};
}
```

### 4. Use the Formatter component
```svelte
<script>
  import { Formatter } from 'sveltekit-mf2';
  import { setLocale } from '$lib/translations';

  function switchLanguage() {
    setLocale('es');
  }
</script>

<Formatter id="common.greeting" props={{ name: "World" }} />

<button onclick={switchLanguage}>Español</button>
```

## Supported Markup Tags

The library supports the following markup tags out of the box:

- `{#bold}...{/bold}` - Bold text (`<b>`)
- `{#italic}...{/italic}` - Italic text (`<i>`)
- `{#link to="url"}...{/link}` - Hyperlinks (`<a>`)
- `{#link}...{/link}` - Links without href (underlined)
- `{#error}...{/error}` - Error styling (red text)
- `{#star-icon/}` - Standalone star icon (⭐)

## API Reference

### Components

#### `<Formatter>`

Props:
- `id: string` - Translation key (e.g., "common.greeting")
- `props: Record<string, any>` - Variables to interpolate



# test
