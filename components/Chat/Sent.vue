<script setup lang="ts">
import type { IMessage } from "~/types";

interface Props {
	message: IMessage;
}
defineProps<Props>();

const { getRelativeTime } = useDateFormatter();
</script>

<template>
	<div
		class="bg-royal-green-500 leading-6 max-w-[500px] ml-auto px-8 py-5 rounded-[14px] rounded-br-none flex flex-col gap-1">
		<span class="text-[#FBFBFD] text-sm">{{ message.text }}</span>
		<span class="text-xs text-right text-[#fbfbfd]">{{ getRelativeTime(message.created_at) }}</span>
	</div>
</template>

<style scoped></style>
