import i18n from '@sveltekit-i18n/base';
import type { Config } from '@sveltekit-i18n/base';

let i18nInstance= null;

export function initI18n(userConfig: Omit<Config, 'parser'>) {
	const config = {
		...userConfig,
		parser: {
			parse(value: string, [props]: Record<string, any>[], locale: string) {
				return { value, props, locale };
			}
		}
	};

	i18nInstance = new i18n(config);
	return i18nInstance;
}

function getI18n() {
	if (!i18nInstance) {
		throw new Error(
			'sveltekit-mf2: i18n not initialized. Call initI18n() in your app before using translation features.'
		);
	}
	return i18nInstance;
}

export const t = $derived(getI18n().t);
export const locale = $derived(getI18n().locale);
export const locales = $derived(getI18n().locales);
export const loading = $derived(getI18n().loading);
export const setLocale = (...args: Parameters<ReturnType<typeof i18n>['setLocale']>) =>
	getI18n().setLocale(...args);
export const loadTranslations = (
	...args: Parameters<ReturnType<typeof i18n>['loadTranslations']>
) => getI18n().loadTranslations(...args);