import { Router } from 'express';
import { subscriptionController } from '../controllers/subscription.controller';
import { authenticateUser } from '../middleware/auth';

const router = Router();

router.post('/', authenticateUser, subscriptionController.create);
router.get('/:userId', authenticateUser, subscriptionController.get);

export const subscriptionRoutes = router;