<script setup lang="ts">
import { object, string, type InferType } from "yup";
import type { FormSubmitEvent } from "#ui/types";

const user = useSupabaseUser();
const client = useSupabaseClient();
const toast = useToast();

const schema = object({
	text: string().required("Please enter a message"),
});
type Schema = InferType<typeof schema>;

const form = reactive({ text: "" });

const saveUserMessage = async (event: FormSubmitEvent<Schema>) => {
	const payload = { text: event.data.text, user_id: user.value.id };

	const { error } = await client.from("messages").insert(payload);

	if (error) {
		toast.add({
			title: "Error",
			description: error.message ?? "Error sending message.",
			color: "red",
			icon: "i-heroicons-exclamation-circle",
		});
	} else {
		form.text = "";
	}
};
</script>

<template>
	<UForm
		:schema
		:state="form"
		class="mt-auto flex items-center border-t border-gray-200 px-5 py-1 w-full gap-5 min-h-[80px]"
		@submit="saveUserMessage">
		<UFormGroup class="input | w-full items-start" name="text">
			<UInput v-model="form.text" size="md" placeholder="Enter a message" class="w-full" name="text" />
			<template #error></template>
		</UFormGroup>
		<UButton icon="i-heroicons-paper-airplane" type="submit" :ui="{ rounded: 'rounded-full' }" />
	</UForm>
</template>

<style scoped>
.input :deep(.text-red-500) {
	@apply hidden;
}
</style>
