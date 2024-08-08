<script setup lang="ts"></script>

<template>
	<div class="w-full grid lg:grid-cols-2">
		<div class="h-screen bg-royal-green-50 hidden lg:flex items-center justify-center">
			<img src="/images/chat.webp" alt="chat illustrations" class="max-h-full max-w-full mx-auto block" />
		</div>
		<div class="overflow-y-auto flex items-center justify-center px-5 lg:px-10 py-10 w-full">
			<div class="max-w-[500px] mx-auto w-full">
				<slot />
			</div>
		</div>
	</div>
</template>

<style scoped></style>
