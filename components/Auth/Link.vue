<script setup lang="ts">
interface Props {
	text: string;
	routeName: string;
	routeTitle: string;
}
defineProps<Props>();
</script>

<template>
	<p class="text-sm font-medium text-gray-600 text-center flex-wrap flex items-center justify-center gap-1">
		{{ text }}
		<nuxt-link :to="{ name: routeName }" class="text-royal-green-500 font-semibold inline-flex items-center gap-1">
			{{ routeTitle }}
			<UIcon name="i-heroicons-arrow-long-right" />
		</nuxt-link>
	</p>
</template>

<style scoped></style>
