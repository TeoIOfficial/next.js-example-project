const routes = {
	home: '/',
	login: '/login',
	register: '/register',
	logout: '/logout',
	theme: '/theme',
	users: '/users',
	user_profile: function (userId) {
		return `${this.users}/${userId}`;
	},
};

export default routes;
