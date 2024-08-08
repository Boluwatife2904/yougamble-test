<script setup lang="ts">
interface Props {
	name: string;
}
defineProps<Props>();
</script>

<template>
	<UTooltip :text="name">
		<UAvatar :alt="name" />
	</UTooltip>
</template>

<style scoped></style>
