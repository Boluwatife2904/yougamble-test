export default defineNuxtRouteMiddleware(() => {
	const user = useSupabaseUser();

	if (!user) {
		return navigateTo({ name: "auth-login" });
	}
});
