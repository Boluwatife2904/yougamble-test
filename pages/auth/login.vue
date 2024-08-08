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

const form = reactive({ email: "", password: "" });
const requestStatus = ref<RequestStatus>("idle");

const schema = object({
	email: string().email("Invalid email").required("Email address is required"),
	password: string().min(6, "Must be at least 6 characters").required("Password is required"),
});
type Schema = InferType<typeof schema>;

const handleLogin = async (event: FormSubmitEvent<Schema>) => {
	requestStatus.value = "pending";

	const { error } = await client.auth.signInWithPassword({ ...event.data });

	if (error) {
		toast.add({ title: "Error", description: error.message, color: "red", icon: "i-heroicons-exclamation-circle" });
	} else {
		navigateTo({ name: "chat" }, { replace: true });
	}

	requestStatus.value = "idle";
};
</script>

<template>
	<div class="w-full space-y-10">
		<AuthHeader title="Welcome Back!" description="Login into your account" />
		<UForm :state="form" :schema class="space-y-6" @submit="handleLogin">
			<UFormGroup label="Email address" class="w-full space-y-3" name="email">
				<UInput
					v-model="form.email"
					placeholder="johndoe@gmail.com"
					label="Emaill"
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

			<UButton type="submit" size="xl" block :loading="requestStatus === 'pending'">Login</UButton>

			<p class="text-sm font-medium text-gray-600 flex flex-wrap items-center justify-center gap-1">
				Don't have an account?
				<nuxt-link
					:to="{ name: 'auth-register' }"
					class="text-royal-green-500 font-semibold gap-1 flex items-center">
					Register
					<UIcon name="i-heroicons-arrow-long-right" />
				</nuxt-link>
			</p>
		</UForm>
	</div>
</template>

<style scoped></style>
