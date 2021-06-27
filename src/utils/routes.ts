export type Route = {
	en: string,
	bg: string,
}

export type Routes = {
	home: Route,
	login: Route,
	register: Route,
	logout: Route,
	theme: Route,
	users: Route,
	user_profile(id: number): Route,
	goBack: Route
}

const routes: Routes = {
	home: {
		en: '/',
		bg: '/'
	},
	login: {
		en: '/login',
		bg: '/влез'
	},
	register: {
		en: '/register',
		bg: '/регистрация'
	},
	logout: {
		en: '/logout',
		bg: '/излез'
	},
	theme: {
		en: '/theme',
		bg: '/тема'
	},
	users: {
		en: '/users',
		bg: '/потребители'
	},
	user_profile: id => ({
		en: `/users/${id}`,
		bg: `/потребители/${id}`
	}),
	goBack: {
		en: '/go-back',
		bg: '/назад'
	},
};

export default routes;
