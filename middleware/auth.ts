export default defineNuxtRouteMiddleware(() => {
	const user = useSupabaseUser();
	console.log('user', user);
	if (!user.value) {
		return navigateTo({ name: "auth-login" });
	}
});
