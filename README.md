# SvelteKit MF2

A localization library for SvelteKit based on @sveltekit-i18n/base and Message Format 2.

## Installation
```bash
npm install sveltekit-mf2
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
