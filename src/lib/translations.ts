import i18n from "@sveltekit-i18n/base";

export type Loaders = {
    locale: string;
    key: string;
    loader: () => Promise<Record<string, any>>;
}[]

let userLoaders: Loaders = []

export function initI18N(loaders: Loaders) {
  userLoaders = loaders
}

const config = {
  loaders: userLoaders,
  parser: {
    parse(value: string, [props]: [Record<string, any>] | [], locale: string) {
      if (!value || typeof value !== 'string') {
        return { value: '', props: props || {}, locale }
      }
      return { value, props: props || {}, locale }
    }
  }  
};

export const {setLocale, t, locale, locales, loading, loadTranslations } = new i18n(config);
