<script lang="ts">
  import { initI18N, setLocale, loading, loadTranslations } from "$lib/translations.js" 
  import Formatter from "$lib/Formatter.svelte"

  initI18N([
        {
        locale: 'en',
        key: 'common',
        loader: async () => ({
            greeting: 'Hello {name}!',
            welcome: 'Welcome to {#bold}our site{/bold}'
        })
        }
    ]);
    setLocale("en")
</script>


<h1>Testing sveltekit-mf2</h1>

<Formatter id="common.greeting" props={{ name: 'World' }} />
<br>
<Formatter id="common.welcome" props={{}} />
