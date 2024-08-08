<script setup lang="ts">
import { object, string, type InferType } from "yup";
import type { FormSubmitEvent } from "#ui/types";
import type { RequestStatus } from "~/types";

definePageMeta({
	layout: "auth",
});

const schema = object({
	displayName: string().required("Display name is required"),
	email: string().email("Invalid email").required("Email address is required"),
	password: string().min(8, "Must be at least 8 characters").required("Password is required"),
});

type Schema = InferType<typeof schema>;

const form = reactive({ displayName: "", email: "", password: "" });
const requestStatus = ref<RequestStatus>("idle");

const handleRegister = (event: FormSubmitEvent<Schema>) => {
	console.log("event >>>>>", event.data);
};
</script>

<template>
	<div class="w-full">
		<UForm
			:state="form"
			:schema
			class="flex flex-col gap-6 items-center justify-center max-w-[500px] mx-auto shadow bg-white px-10 py-8 rounded-xl"
			@submit="handleRegister">
			<UFormGroup label="Display Name" class="w-full space-y-3" name="displayName">
				<UInput
					v-model="form.displayName"
					placeholder="John Doe"
					class="w-full"
					size="lg"
					icon="i-heroicons-user" />
			</UFormGroup>
			<UFormGroup label="Email address" class="w-full space-y-3" name="email">
				<UInput
					v-model="form.email"
					placeholder="johndoe@gmail.com"
					class="w-full"
					size="lg"
					icon="i-heroicons-envelope" />
			</UFormGroup>
			<UFormGroup label="Password" class="w-full space-y-3" name="password">
				<UInput
					v-model="form.password"
					placeholder="**********"
					class="w-full"
					size="lg"
					icon="i-heroicons-lock-closed" />
			</UFormGroup>
			<UButton type="submit" size="xl" block>Register</UButton>
		</UForm>
	</div>
</template>

<style scoped></style>
