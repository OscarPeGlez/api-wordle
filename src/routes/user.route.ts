import { Router } from 'express';
import {
  createUser, getStatistics, getTopUsers, validateWord,
} from '../controllers/user.controller';

const router: Router = Router();

router.post('/', createUser);
router.post('/validateWord', validateWord);
router.get('/:idUser/statistics', getStatistics);
router.get('/getTopUsers', getTopUsers);

export default router;
