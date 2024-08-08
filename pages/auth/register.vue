<script setup lang="ts">
import { object, string, type InferType } from "yup";
import type { FormSubmitEvent } from "#ui/types";
import type { RequestStatus } from "~/types";

definePageMeta({
	layout: "auth",
	middleware: "guest",
});

const client = useSupabaseClient();
const toast = useToast();

const form = reactive({ displayName: "", email: "", password: "" });
const requestStatus = ref<RequestStatus>("idle");

const schema = object({
	displayName: string().required("Display name is required"),
	email: string().email("Invalid email").required("Email address is required"),
	password: string().min(6, "Must be at least 6 characters").required("Password is required"),
});
type Schema = InferType<typeof schema>;

const handleRegister = async (event: FormSubmitEvent<Schema>) => {
	requestStatus.value = "pending";

	const { error } = await client.auth.signUp({
		email: event.data.email,
		password: event.data.password,
		options: {
			data: { displayName: event.data.displayName },
		},
	});

	if (error) {
		toast.add({ title: "Error", description: error.message, color: "red" });
	} else {
		navigateTo({ name: "chat" }, { replace: true });
	}
	requestStatus.value = "idle";
};
</script>

<template>
	<div class="space-y-10">
		<AuthHeader title="Create an account" description="Sign up to continue" />
		<div class="w-full space-y-8">
			<UForm
				:state="form"
				:schema
				class="flex flex-col gap-6 items-center justify-center"
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
				<UButton type="submit" size="xl" block :loading="requestStatus === 'pending'">Register</UButton>
			</UForm>
			<p class="text-sm font-medium text-gray-600 text-center flex-wrap flex items-center justify-center gap-1">
				Already have an account?
				<nuxt-link
					:to="{ name: 'auth-login' }"
					class="text-royal-green-500 font-semibold inline-flex items-center gap-1">
					Login
					<UIcon name="i-heroicons-arrow-long-right" />
				</nuxt-link>
			</p>
		</div>
	</div>
</template>

<style scoped></style>
