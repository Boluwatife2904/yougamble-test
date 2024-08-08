import { defineEventHandler } from "h3";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

export default defineEventHandler(async (event) => {
	const authHeader = event.node.req.headers["authorization"];
	const BEARER_TOKEN = process.env.BEARER_TOKEN;

	// Validate authorization header
	if (authHeader !== `Bearer ${BEARER_TOKEN}`) {
		throw createError({ status: 401, message: "Unauthorized!" });
	}

	// Fetch list of users from supabase
	const { data: users, error } = await supabase.from("profiles").select("email, created_at");
	if (error) {
		throw createError({ status: 400, message: `[Bad Request]: Error fetching users: ${error.message}` });
	}

	return users;
});
