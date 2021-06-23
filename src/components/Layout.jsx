import { useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useRouter } from 'next/router';
import { selectUser } from "store/slices/userSlice";
import { logout } from "store/slices/authSlice";
import { setTheme, changeTheme, setBrowser, setIsMobile, selectUtils } from "store/slices/utilsSlice";
import Link from 'next/link';
import Breadcrumbs from './Breadcrumbs';
import { getBrowser } from "utils/helpers";
import cn from 'classnames';

// TODO: fixbootstrap navbar nav collapse

function Layout({ children, noHeader, noFooter}) {

    const router = useRouter();

    const user = useSelector(selectUser);

    const utils = useSelector(selectUtils);

    const dispatch = useDispatch();
    
    useEffect(() => {   
        
        let { userAgent } = navigator;

        batch(() => {

            dispatch(setTheme(localStorage.getItem('theme')));

            dispatch(setIsMobile(Boolean(userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i))));

            dispatch(setBrowser(getBrowser(userAgent)));

        });

    }, [dispatch]);

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
                            <Link href="/">
                                <a className="navbar-brand" title="This is an anchor title for SEO purposes" {...(router.asPath === '/' ? { 'aria-current': 'page' } : {})}>                           
                                    <h1 className="h4">Next.js, redux and bootstrap boilerplate</h1>                       
                                </a>
                            </Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav ms-auto">
                                    {!user.isLoggedIn && (
                                        <>
                                            <li className="nav-item">
                                                <Link href="/login">
                                                    <a
                                                        className={cn("nav-link", { "active": router.asPath === '/login'})}
                                                        {...(router.asPath === '/login' ? { 'aria-current': 'page' } : {})}
                                                        title="This is an anchor title for SEO purposes"
                                                    >
                                                        Log in
                                                    </a>
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link href="/register">
                                                    <a
                                                        className={cn("nav-link", { "active": router.asPath === '/register'})}
                                                        {...(router.asPath === '/register' ? { 'aria-current': 'page' } : {})}
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
                                                <Link href="/users">
                                                    <a
                                                        className={cn("nav-link", { "active": router.asPath.startsWith('/users')})}
                                                        {...(router.asPath === '/users' ? { 'aria-current': 'page' } : {})}
                                                        title="This is an anchor title for SEO purposes"
                                                    >
                                                        Users
                                                    </a>
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link href="/dashboard">
                                                    <a
                                                        className={cn("nav-link", { "active": router.asPath.startsWith('/dashboard')})}
                                                        {...(router.asPath === '/dashboard' ? { 'aria-current': 'page' } : {})}
                                                        title="This is an anchor title for SEO purposes"
                                                    >
                                                        Dashboard
                                                    </a>
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link href="#">
                                                    <a className="nav-link" onClick={logoutUser} title="This is an anchor title for SEO purposes">
                                                         Log out
                                                    </a>
                                                </Link>
                                            </li>
                                        </>  
                                    )}
                                    <li className="nav-item">
                                        <Link href="#">
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
                <Breadcrumbs />
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
                                    <Link href="/">
                                        <a
                                            className={cn("nav-link", { "active": router.asPath === '/'})}
                                            {...(router.asPath === '/' ? { 'aria-current': 'page' } : {})}
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
    noFooter: false
};

export default Layout;