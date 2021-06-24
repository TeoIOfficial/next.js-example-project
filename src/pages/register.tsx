import { useState } from "react";
import {NextPage} from 'next';
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import { register, selectAuth } from "store/slices/authSlice";
import Layout from "components/Layout";
import { wrapper } from 'store';
import routes from "utils/routes";

export const getServerSideProps = wrapper.getServerSideProps(store => async () => {

    if (store.getState().user.isLoggedIn) {
        return {
            redirect: {
                destination: routes.home,
                permanent: false,
            }
        }
    }
    
});

const Register: NextPage = () => {

    const auth = useSelector(selectAuth);
    
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleFormSubmit = e => {

        e.preventDefault();

        dispatch(register({
            email,
            password
        }));

    };

    return (
		<Layout>
			<Head>
				<title>Register</title>
            </Head>
            <div className="container shadow p-5 bg-light rounded-3">
                <form onSubmit={handleFormSubmit}>
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)}/>
                        <label htmlFor="email">E-mail</label>
                        <div id="emailHelp" className="form-text">Enter e-mail - eve.holt@reqres.in</div>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control" id="password" aria-describedby="passwordHelp" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                        <label htmlFor="password">Password</label>
                        <div id="passwordHelp" className="form-text">Enter password - pistol</div>
                    </div>
                    {auth.registerError && (
                        <div className="mb-3">
                        <span id="passwordHelpInline" className="form-text text-danger mb-3">
                            {auth.registerError}
                        </span>
                    </div>
                    )}
                    <button type="submit" className="btn btn-primary" disabled={auth.isRegistering}>
                        {auth.isRegistering ? 'Registering...' : 'Register'}
                    </button>
                </form>
            </div>
		</Layout>
    );
}

export default Register;