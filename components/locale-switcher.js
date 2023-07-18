import Link from 'next/link'
import { useRouter } from 'next/router'

export default function LocaleSwitcher() {
    const router = useRouter()
    const { locales, locale: activeLocale } = router
    // console.log(locales)
    const otherLocales = locales?.filter((locale) => locale !== activeLocale)
    // console.log('activeLocale', activeLocale)

    return (
        <div>
            <p>Locale switcher:</p>
            <ul>
                {otherLocales?.map((locale) => {
                    const { pathname, query, asPath } = router
                    // console.log(pathname)
                    return (
                        <li key={locale}>
                            <Link href={`${pathname}`} locale={locale}>
                                {locale}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
