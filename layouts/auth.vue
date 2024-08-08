<script setup lang="ts"></script>

<template>
	<div class="w-full grid lg:grid-cols-2">
		<div class="h-screen bg-royal-green-50 hidden lg:block"></div>
		<div class="h-screen overflow-y-auto flex items-center justify-center px-5 lg:px-10 w-full">
			<div class="max-w-[500px] mx-auto w-full">
				<slot />
			</div>
		</div>
	</div>
</template>

<style scoped></style>
