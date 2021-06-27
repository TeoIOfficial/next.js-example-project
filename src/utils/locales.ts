export type Locale = {
    locale: string,
    text: string
}

export type Locales = {
    en: Locale,
    bg: Locale
}

const locales: Locales = {
    en: {
        locale: 'en',
        text: 'EN'
    },
    bg: {
        locale: 'bg',
        text: 'БГ'
    }
}

export default locales;