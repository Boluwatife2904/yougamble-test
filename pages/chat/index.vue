<script setup lang="ts">
import type { IMessage } from "~/types";

definePageMeta({
	middleware: "auth",
});
const client = useSupabaseClient();
const user = useSupabaseUser();

const messages = ref<IMessage[]>([]);

const signOut = async () => {
	await client.auth.signOut();
	return navigateTo({ name: "auth-login" }, { replace: true });
};
</script>

<template>
	<div>
		<div class="bg-white border-b border-gray-200 flex px-5 py-4 items-center justify-between flex-wrap">
			<div class="flex items-center gap-2">
				<UAvatar :alt="user?.user_metadata?.displayName ?? '**'" size="lg" />
				<h6 class="font-medium text-gray-600 text-nase">{{ user?.user_metadata?.displayName }}</h6>
			</div>
			<button class="text-red-500 font-medium text-sm ml-auto inline-flex items-center gap-1" @click="signOut">
				Logout
				<UIcon name="i-heroicons-arrow-left-end-on-rectangle" />
			</button>
		</div>

		<div class="h-[calc(100dvh_-_81px)] flex flex-col">
			<ul
				v-if="messages && messages.length"
				class="bg-white space-y-3 flex flex-col items-start px-5 lg:px-10 py-5 h-[calc(100%_-_80px)] overflow-y-scroll">
				<template v-for="message in messages" :key="message.id">
					<ChatReceived v-if="message.type === 'received'" :message />
					<ChatSent v-else-if="message.type === 'sent'" :message />
				</template>
			</ul>
			<CommonEmptyState v-else class="min-h-[500px]" />
			<ChatMessageInput class="mt-auto" />
		</div>
	</div>
</template>

<style scoped></style>
