import { TicketPriority, TicketStatus, TicketType } from "../domain/enums";

export type CreateTicketDto = {
  title: string;
  description: string;
  reporterId: string;
  status?: TicketStatus;
  assignedToId?: string;
  priority?: TicketPriority;
  type?: TicketType;
};
