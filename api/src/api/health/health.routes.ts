import { Router } from 'express';
import { healthCheck } from './health.controller';

const router = Router();

router.get('/health', healthCheck);

export default router;
