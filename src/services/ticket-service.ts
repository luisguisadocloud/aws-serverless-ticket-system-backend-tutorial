import { TicketPriority, TicketStatus, TicketType } from "../domain/enums";
import { Ticket } from "../domain/ticket";
import { CreateTicketDto } from "../dtos/create-ticket.dto";
import { TicketRepository } from "../repositories/ticket-repository";

export class TicketService {
  private readonly ticketRepository: TicketRepository;

  constructor() {
    this.ticketRepository = new TicketRepository();
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