<script setup lang="ts">
interface Props {
	title: string;
	description: string;
}
defineProps<Props>();
</script>

<template>
	<div class="space-y-2">
		<h6 class="text-2xl font-semibold">{{ title }}</h6>
		<p class="text-base text-gray-500 font-medium">{{ description }}</p>
	</div>
</template>

<style scoped></style>
