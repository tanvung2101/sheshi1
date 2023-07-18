// import LocalStorage from '@/utils/storage'
import i18n from 'i18next'

import enTransition from './en/transitions.json'
import enError from './en/errors.json'
import enValidation from './en/validations.json'

import viTransition from './vi/transitions.json'
import viError from './vi/errors.json'
import viValidation from './en/validations.json'
import { initReactI18next } from 'react-i18next'

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: {
            vi: {
                translations: viTransition,
                errors: viError,
                validations: viValidation
            },
            en: {
                translations: enTransition,
                errors: enError,
                validations: enValidation
            }
        },
        // lng:
        //     LocalStorage.has('lang') && LocalStorage.get('lang') === 'en'
        //         ? 'en'
        //         : 'vi',
        fallbackLng: ['vi', 'en'],
        debug: false,
        ns: ['translations', 'errors', 'validations'],
        defaultNS: 'translations',
        interpolation: {
            escapeValue: false,
            formatSeparator: ','
        },
        react: {
            wait: true
        }
    })

export default i18n