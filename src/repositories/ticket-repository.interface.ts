import { Ticket } from "../domain/ticket";

export interface ITicketRepository {
  create(ticket: Ticket): Promise<void>;  
}
