import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from "react-redux";
import { selectUtils } from "store/slices/utilsSlice";
import cn from 'classnames';
import routes from 'utils/routes';

export default function Breadcrumbs() {

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
                    {breadcrumbs.map((breadcrumb) => (
                        <li key={breadcrumb.href} className="breadcrumb-item">
                            <Link href={breadcrumb.href}>
                                <a
                                    className={cn(
                                        "text-decoration-none",
                                        {
                                            'text-dark': utils.theme === 'light',
                                            'text-light': utils.theme === 'dark'
                                        }
                                    )}
                                    title="This is an anchor title for SEO purposes"
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
