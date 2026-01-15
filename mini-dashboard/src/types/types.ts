export type EventType = "login" | "logout" | "update" | "purchase";
export type EventStatus = "success" | "pending" | "failed";

export interface UserEvent {
  firstName: string;
  lastName: string;
  id: number;
  type: EventType;
  status: EventStatus;
  user: string;
  createdAt: string;
  amount?: number;
}
