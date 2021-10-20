import { Request, Response } from 'express';
import { CreateMessageService } from '../services/CreateMessageService';

interface ICreateMessageRequest {
  message: string;
}

export class CreateMessageController {
  async handle(request: Request, response: Response) {
    const { message }: ICreateMessageRequest = request.body;
    const user_id = request.user_id;

    const createMessageService = new CreateMessageService();

    const result = await createMessageService.execute({
      text: message,
      user_id
    });

    return response.json(result);
  }
}