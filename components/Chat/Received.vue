<script setup lang="ts">
import type { IMessage } from "~/types";

interface Props {
	message: IMessage;
}
const props = defineProps<Props>();

const { getRelativeTime } = useDateFormatter();
</script>

<template>
	<div class="flex items-end gap-1">
		<ChatAvatar :name="props?.message?.profiles?.display_name ?? ''" />
		<div class="max-w-[500px] bg-[#F5F5F5] py-5 px-10 rounded-2xl rounded-bl-none flex flex-col gap-1">
			<span class="text-sm text-[#141414]">{{ message.text }}</span>
			<span class="text-[10px] leading-3 text-right text-[#4F5665]">
				~ {{ getRelativeTime(message.created_at) }}
			</span>
		</div>
	</div>
</template>

<style scoped></style>
