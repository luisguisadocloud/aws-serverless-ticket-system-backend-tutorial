import { Ticket } from "../domain/ticket";
import { CreateTicketDto } from "../dtos/create-ticket.dto";

export interface ITicketService { 
  createTicket(createTicket: CreateTicketDto): Promise<Ticket>;
}
