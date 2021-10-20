import { prismaClient } from '../prisma';

interface IProfileUserRequest {
  user_id: string;
}

export class ProfileUserService {
  async execute({user_id}: IProfileUserRequest) {
    const messages = await prismaClient.user.findFirst({
      where: {
        id: user_id
      }
    });

    return messages;
  }
}