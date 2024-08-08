export type RequestStatus = "idle" | "pending" | "success" | "failed";

export interface IMessage {
	id: string;
	sender_id: string;
	text: string;
	created_at: string;
}
