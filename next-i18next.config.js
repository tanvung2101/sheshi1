const path = require('path');

module.exports = {
    i18n: {
        locales: ['en', 'vi'],
        defaultLocale: 'vi',
        localeDetection: false,
    },
    trailingSlash: true,
    localePath:
        typeof window === 'undefined'
            ? require('path').resolve('./public/locales')
            : './public/locales',
    ns: ['common', 'translations', 'errors', 'validations'],
    interpolation: {
        prefix: '{',
        suffix: '}',
    },
    localeStructure: '{lng}/{ns}',
    // fallbackLng: {
    //     default: ['vi'],
    //     'de-CH': ['vi'],
    // },
    // nonExplicitSupportedLngs: true,
}