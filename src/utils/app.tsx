import { GetServerSidePropsContext } from 'next';
import cookies from 'next-cookies';
import { setAuthUser, clearAuthUser } from 'store/slices/authSlice';

export const appGetServerSideProps = async (store: any, ctx: GetServerSidePropsContext, cb: Function) => {
	
    // console.log(process.env.ENV_VAR_MAIN);
    // console.log(process.env.ENV_VAR);
    // console.log(process.env.NEXT_PUBLIC_ENV_VAR_MAIN);

    let token = cookies(ctx)?.token;

    if (token) {
        
        await store.dispatch(setAuthUser(+token));

    } else {

        store.dispatch(clearAuthUser());

    }
    
    return cb();
    
};
