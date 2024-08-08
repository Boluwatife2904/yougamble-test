<script setup lang="ts">
import type { IMessage, IMessageWithProfile, IProfile } from "~/types";

definePageMeta({
	middleware: "auth",
});
useSeoMeta({
	title: "Chat | Dashboard",
});

const client = useSupabaseClient();
const user = useSupabaseUser();

const messagesRef = ref<HTMLUListElement | null>(null);

const { data: messages } = await useAsyncData("messages", async () => {
	const { data, error } = await client
		.from("messages")
		.select("*, profiles(display_name)")
		.order("created_at", { ascending: true });
	if (error) {
		throw new Error(error.message);
	}
	return data as unknown as IMessageWithProfile[];
});

const signOut = async () => {
	await client.auth.signOut();
	return navigateTo({ name: "auth-login" }, { replace: true });
};

const scrollToBottom = () => {
	if (messagesRef.value) {
		messagesRef.value.scrollTop = messagesRef.value.scrollHeight;
	}
};

const handleNewMessage = async (payload: { new: IMessage }) => {
	if (payload.new) {
		const { data } = await client.from("profiles").select("*").eq("id", payload.new.user_id).single();
		if (data) {
			messages.value?.push({ ...payload.new, profiles: { ...(data as IProfile) } });
			await nextTick();
			scrollToBottom();
		}
	}
};

client
	.channel("messages")
	.on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, handleNewMessage)
	.subscribe();

onMounted(() => {
	scrollToBottom();
});
</script>

<template>
	<div>
		<div class="bg-white border-b border-gray-200 flex px-5 py-4 items-center justify-between flex-wrap">
			<div class="flex items-center gap-2">
				<UAvatar :alt="user?.user_metadata?.display_name ?? '**'" size="lg" chip-color="royal-green" />
				<div class="space-y-1">
					<h6 class="font-medium text-gray-600 text-base">{{ user?.user_metadata?.display_name }}</h6>
					<span class="text-sm text-gray-500 italic">Active</span>
				</div>
			</div>
			<button class="text-red-500 font-medium text-sm ml-auto inline-flex items-center gap-1" @click="signOut">
				Logout
				<UIcon name="i-heroicons-arrow-left-end-on-rectangle" />
			</button>
		</div>

		<div class="h-[calc(100dvh_-_81px)] flex flex-col">
			<ul
				v-if="messages && messages.length"
				ref="messagesRef"
				class="bg-white space-y-3 flex flex-col items-start px-5 lg:px-10 py-5 h-[calc(100%_-_80px)] overflow-y-scroll scroll-smooth">
				<template v-for="message in messages" :key="message.id">
					<ChatSent v-if="message.user_id === user.id" :message />
					<ChatReceived v-else :message />
				</template>
			</ul>

			<CommonEmptyState v-else class="min-h-[500px]" />

			<ChatMessageInput />
		</div>
	</div>
</template>

<style scoped></style>
