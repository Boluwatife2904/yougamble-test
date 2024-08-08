export default defineNuxtRouteMiddleware(() => {
	const user = useSupabaseUser();

	if (user) {
		return navigateTo({ name: "chat" });
	}
});
