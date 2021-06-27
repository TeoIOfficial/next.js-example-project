import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from "react-redux";
import { selectUtils } from "store/slices/utilsSlice";
import cn from 'classnames';
import routes from 'utils/routes';
import { FC, ReactElement } from 'react';
import { useTranslation } from 'next-i18next';
import themes from 'utils/themes';

type Breadcrumb = {
    segment: string,
    href: string
}

const Breadcrumbs: FC = (): ReactElement => {

    const {t} = useTranslation(['common']);

    const router = useRouter();

    const utils = useSelector(selectUtils);

    const [breadcrumbs, setBreadcrumbs] = useState([]);

    useEffect(() => {
        
        if (router.asPath === routes.home) {

            setBreadcrumbs([{ segment: 'Home', href: routes.home }]);

            return;

        }

        const linkPath = router.asPath.split('/');
            
        const pathArray = linkPath.map((path, i) => ({    
            segment: path || 'Home',
            href: path ? linkPath.slice(0, i + 1).join('/') : routes.home           
        }));
        
        setBreadcrumbs(pathArray);

    }, [router]);

    return (
        <nav className={`border-bottom py-3 bg-${utils.theme}`} aria-label="breadcrumb">
            <div className="container-fluid">
                <ol className="breadcrumb m-0">
                    {breadcrumbs.map((breadcrumb: Breadcrumb) => (
                        <li key={breadcrumb.href} className="breadcrumb-item">
                            <Link href={breadcrumb.href}>
                                <a
                                    className={cn(
                                        "text-decoration-none",
                                        {
                                            'text-dark': utils.theme === themes.light,
                                            'text-light': utils.theme === themes.dark
                                        }
                                    )}
                                    title={t('common:href_title_placeholder')}
                                    {...(breadcrumb.href === router.asPath ? { 'aria-current': 'page' } : {})}
                                >
                                    {breadcrumb.segment}
                                </a>
                            </Link>
                        </li>
                    ))}
                </ol>
            </div>
        </nav>
    )
}

export default Breadcrumbs;