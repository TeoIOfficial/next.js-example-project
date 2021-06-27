export type Routes = {
	home: string,
	login: string,
	register: string,
	logout: string,
	theme: string,
	users: string,
	user_profile(id: number): string,
	goBack: string
}

const routes: Routes = {
	home: '/',
	login: '/login',
	register: '/register',
	logout: '/logout',
	theme: '/theme',
	users: '/users',
	user_profile: function (id) {
		return `${this.users}/${id}`;
	},
	goBack: '/go-back'
};

export default routes;
