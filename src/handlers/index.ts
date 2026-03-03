import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { CreateTicketDto } from "../dtos/create-ticket.dto";
import { Router } from "../router/router";
import { TicketService } from "../services/ticket-service";

const router = new Router();
const ticketService = new TicketService();

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log("handler v4", event);

  try {
    if (router.isCreateTicket(event.path, event.httpMethod)) { // HTTP
      if (event.body === null) {
        throw new Error("Body is null");
      }

      const json: CreateTicketDto = JSON.parse(event.body); // HTTP
      
      const ticket = await ticketService.createTicket(json);      

      const response = {
        statusCode: 201,
        body: JSON.stringify(ticket),
      };
      return response;
    }

    return {
      statusCode: 404,
      body: JSON.stringify({ message: "Path Not Found" }),
    };

  } catch (error) {
    console.error("Error in handler: ", error);
    
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return {
      statusCode: 500,
      body: JSON.stringify({ message: errorMessage })
    };
  }
};
