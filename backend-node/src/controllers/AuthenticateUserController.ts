import { Request, Response } from 'express';
import { AuthenticateUserService } from '../services/AuthenticateUserService';

interface IAuthUserRequest {
  code: string;
}

export class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { code }: IAuthUserRequest = request.body;

    const service = new AuthenticateUserService();
    
    try {
      const result = await service.execute(code);

      return response.json(result);
    } catch(err) {
      return response.json({
        error: err.message
      });
    }
  }
}