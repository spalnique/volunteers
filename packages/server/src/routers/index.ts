import { Router } from 'express';

import statusHandler from '../middlewares/statusHandler.ts';
import notFoundHandler from '../middlewares/notFoundHandler.ts';
import errorHandler from '../middlewares/errorHandler.ts';

const router = Router();

router.get('/status', statusHandler);

router.use('/*', notFoundHandler);
router.use(errorHandler);

export default router;
