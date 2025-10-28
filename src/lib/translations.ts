import i18n from "@sveltekit-i18n/base";

type Loaders = {
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
    parse(value: string, [props]: Record<string, any>[], locale: string) {
      return { value, props, locale}
    }
  }  
};

export const {setLocale, t, locale, locales, loading, loadTranslations } = new i18n(config);