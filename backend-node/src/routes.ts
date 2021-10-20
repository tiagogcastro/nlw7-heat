import { Router } from 'express';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateMessageController } from './controllers/CreateMessageController';
import { GetLast3MessageController } from './controllers/GetLast3MessageController';
import { ProfileUserController } from './controllers/ProfileUserController';
import { ensureAuthenticated } from './middleware/ensureAuthenticated';

export const router = Router();

const authUserController = new AuthenticateUserController();
const createMessageController = new CreateMessageController();
const getLast3MessageController = new GetLast3MessageController();
const profileUserController = new ProfileUserController();

router.post('/authenticate', authUserController.handle);

router.post(
  '/messages', 
  ensureAuthenticated, 
  createMessageController.handle
);

router.get(
  '/messages/last3', 
  getLast3MessageController.handle
);

router.get(
  '/profile',
  ensureAuthenticated,
  profileUserController.handle
)