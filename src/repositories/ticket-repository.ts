import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { Ticket } from "../domain/ticket";

export class TicketRepository {
  private readonly docClient: DynamoDBDocumentClient;
  private readonly tableName: string;

  constructor() {
    const client = new DynamoDBClient({});
    this.docClient = DynamoDBDocumentClient.from(client);
    this.tableName = process.env.DYN_TICKET_TABLE_NAME ?? "dev-tsb-ddb-tickets";
  }

  async create(ticket: Ticket): Promise<void> {
    const command = new PutCommand({
      TableName: this.tableName,
      Item: ticket
    });

    const responseDB = await this.docClient.send(command);
    console.log(responseDB);
  }

  // findAll
  // findById
  // update
  // delete
}