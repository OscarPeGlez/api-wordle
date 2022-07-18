import { Router } from 'express';
import { createWord, getCurrentWord, mostGuessedWord } from '../controllers/word.controller';

const router: Router = Router();

router.post('/', createWord);
router.get('/getCurrent', getCurrentWord);
router.get('/mostGuessedWord', mostGuessedWord);

export default router;
