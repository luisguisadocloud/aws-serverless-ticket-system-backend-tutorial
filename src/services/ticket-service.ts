import { TicketPriority, TicketStatus, TicketType } from "../domain/enums";
import { Ticket } from "../domain/ticket";
import { CreateTicketDto } from "../dtos/create-ticket.dto";
import { ITicketRepository } from "../repositories/ticket-repository.interface";
import { ITicketService } from "./ticket-service.interface";

export class TicketService implements ITicketService {
  private readonly ticketRepository: ITicketRepository;

  constructor(ticketRepository: ITicketRepository) {
    this.ticketRepository = ticketRepository;
  }

  async createTicket(createTicket: CreateTicketDto): Promise<Ticket> {
    // Lógica de negocio
    const ticket: Ticket = {
      id: crypto.randomUUID(),
      title: createTicket.title,
      description: createTicket.description,
      status: createTicket.status ?? TicketStatus.NEW,
      reporterId: createTicket.reporterId,
      assignedToId: createTicket.assignedToId,
      priority: createTicket.priority ?? TicketPriority.MEDIUM,
      type: createTicket.type ?? TicketType.INCIDENT,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await this.ticketRepository.create(ticket);
    return ticket;
  }
}