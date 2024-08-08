<script setup lang="ts">
definePageMeta({
	middleware: defineNuxtRouteMiddleware(() => navigateTo({ name: "auth-login" })),
});
</script>
