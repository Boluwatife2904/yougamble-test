export type RequestStatus = "idle" | "pending" | "success" | "failed";

export interface IProfile {
	id: string;
	avatar_url: "";
	display_name: "";
}

export interface IMessage {
	id: string;
	user_id: string;
	text: string;
	created_at: string;
}

export interface IMessageWithProfile extends IMessage {
	profiles: IProfile;
}
