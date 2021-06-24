import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import { selectUser } from "store/slices/userSlice";
import { logout } from "store/slices/authSlice";
import { changeTheme, selectUtils } from "store/slices/utilsSlice";
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumbs from './Breadcrumbs';
import cn from 'classnames';
import routes from "utils/routes";

// TODO: fixbootstrap navbar nav collapse

function Layout({ children, noHeader, noFooter, noBreadcrumb}) {

    const router = useRouter();
    
    const user = useSelector(selectUser);

    const utils = useSelector(selectUtils);

    const dispatch = useDispatch();

    const logoutUser = e => {

        e.preventDefault();

        dispatch(logout());

    };

    const toggleTheme = e => {

        e.preventDefault();

        dispatch(changeTheme());

    };

    return (
        <div className="d-flex flex-column vh-100">
            {!noHeader && (
                <header>
                    <nav className={`shadow navbar navbar-expand-lg navbar-${utils.theme} bg-${utils.theme}`}>
                        <div className="container-fluid">
                            <Link href={routes.home}>
                                <a className="navbar-brand" title="This is an anchor title for SEO purposes" {...(router.asPath === routes.home ? { 'aria-current': 'page' } : {})}>                           
                                    <h1 className="h4">Next.js, redux and bootstrap boilerplate</h1>                       
                                </a>
                            </Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav ms-auto align-items-center">
                                    {!user.isLoggedIn && (
                                        <>
                                            <li className="nav-item">
                                                <Link href={routes.login}>
                                                    <a
                                                        className={cn("nav-link", { "active": router.asPath === routes.login})}
                                                        {...(router.asPath === routes.login ? { 'aria-current': 'page' } : {})}
                                                        title="This is an anchor title for SEO purposes"
                                                    >
                                                        Log in
                                                    </a>
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link href={routes.register}>
                                                    <a
                                                        className={cn("nav-link", { "active": router.asPath === routes.register})}
                                                        {...(router.asPath === routes.register ? { 'aria-current': 'page' } : {})}
                                                        title="This is an anchor title for SEO purposes"
                                                    >
                                                        Register
                                                    </a>
                                                </Link>
                                            </li>
                                        </>
                                    )}
                                    {user.isLoggedIn && (
                                        <>
                                            <li className="nav-item">
                                                <Link href={routes.user_profile(user.id)}>
                                                    <a
                                                        className="nav-link"
                                                        {...(router.asPath === routes.user_profile(user.id) ? { 'aria-current': 'page' } : {})}
                                                        title="This is an anchor title for SEO purposes"
                                                    >
                                                        <Image src={user.avatar} className="rounded-circle" alt="User avatar" width={50} height={50}/>
                                                    </a>
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link href={routes.logout}>
                                                    <a className="nav-link" onClick={logoutUser} title="This is an anchor title for SEO purposes">
                                                         Log out
                                                    </a>
                                                </Link>
                                            </li>
                                        </>  
                                    )}
                                    <li className="nav-item">
                                        <Link href={routes.theme}>
                                            <a className="nav-link" onClick={toggleTheme} title="This is an anchor title for SEO purposes">
                                                <i className="bi bi-sun-fill"></i>
                                            </a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </header>
            )}
            <main className="d-flex flex-column flex-grow-1 overflow-auto">
                {!noBreadcrumb && <Breadcrumbs />}
                <div className={`flex-grow-1 overflow-auto p-md-4 p-lg-5 bg-${utils.theme}`}>
                    {children}
                </div>
            </main>
            {!noFooter && (
                <footer className="border-top">
                    <nav className={`navbar navbar-${utils.theme} bg-${utils.theme}`}>
                        <div className="container-fluid">
                            <ul className="navbar-nav mx-auto">
                                <li className="nav-item">
                                    <Link href={routes.home}>
                                        <a
                                            className={cn("nav-link", { "active": router.asPath === routes.home})}
                                            {...(router.asPath === routes.home ? { 'aria-current': 'page' } : {})}
                                            title="This is an anchor title for SEO purposes"
                                        >
                                            Logo
                                        </a>
                                    </Link> 
                                </li>
                             </ul>
                        </div>
                    </nav>
                </footer>
            )}
        </div> 
    )
}

Layout.defaultProps = {
    children: [],
    noHeader: false,
    noFooter: false,
    noBreadcrumb: false
};

export default Layout;