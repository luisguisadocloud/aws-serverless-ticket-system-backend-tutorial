import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { TicketPriority, TicketStatus, TicketType } from "../domain/enums";
import { Ticket } from "../domain/ticket";
import { CreateTicketDto } from "../dtos/create-ticket.dto";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export class TicketService {
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

    // Lógica de persistencia (infraestructura)
    const command = new PutCommand({
      TableName: process.env.DYN_TICKET_TABLE_NAME ?? "dev-tsb-ddb-tickets",
      Item: ticket
    });

    const responseDB = await docClient.send(command);
    console.log(responseDB);

    return ticket;
  }
}