<script setup lang="ts">
definePageMeta({
	middleware: "auth",
});
const client = useSupabaseClient();
</script>

<template>
	<div>
		<button @click="client.auth.signOut()">sign out</button>
	</div>
</template>

<style scoped></style>
