<script setup lang="ts">
import type { IMessage } from "~/types";

interface Props {
	message: IMessage;
}
const props = defineProps<Props>();

const { getRelativeTime } = useDateFormatter();
</script>

<template>
	<div class="w-full items-end flex gap-1">
		<div
			class="bg-royal-green-500 leading-6 max-w-[500px] ml-auto px-8 py-5 rounded-[16px] rounded-br-none flex flex-col gap-1">
			<span class="text-[#FBFBFD] text-sm">{{ message.text }}</span>
			<span class="text-[10px] leaing-3 text-right text-[#fbfbfd] italic">
				~ {{ getRelativeTime(message.created_at) }}
			</span>
		</div>
		<ChatAvatar :name="props?.message?.profiles?.display_name ?? ''" />
	</div>
</template>

<style scoped></style>
