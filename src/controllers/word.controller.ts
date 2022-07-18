import { Request, Response } from 'express';
import { HTTPMessages } from '../commons/constants/messages';
import WordDAO from '../persistence/daos/word.dao';
import Word from '../persistence/entities/Word';
import { INTERNAL_ERROR_CODE, BAD_REQUEST_CODE, NOT_FOUNT_CODE } from '../commons/constants/system';

export const createWord = async (req: Request, res: Response) => {
  try {
    const { word } = req.body;

    if (!word) return res.status(BAD_REQUEST_CODE).json(HTTPMessages.missingWord);

    const newWord: Word = new Word();
    newWord.value = word;

    await WordDAO.saveWord(word);

    return res.json(word);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(INTERNAL_ERROR_CODE).json({ message: error.message });
    }

    return res.status(INTERNAL_ERROR_CODE).json({ message: HTTPMessages.genericError });
  }
};

export const getCurrentWord = async (req: Request, res: Response) => {
  try {
    const currentWord = await WordDAO.findByData({ isCurrent: true });

    if (!currentWord) {
      return res.status(NOT_FOUNT_CODE).json({ message: HTTPMessages.wordNotFound });
    }

    return res.json(currentWord);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(INTERNAL_ERROR_CODE).json({ message: error.message });
    }

    return res.status(INTERNAL_ERROR_CODE).json({ message: HTTPMessages.genericError });
  }
};

export const mostGuessedWord = async (req: Request, res: Response) => {
  try {
    const words: Word[] = await WordDAO.getMostGuessedWord();

    const result = words.map((word) => ({
      word: word.value,
      totalGuessed: word.hits,
    }));
    return res.json(result);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(INTERNAL_ERROR_CODE).json({ message: error.message });
    }

    return res.status(INTERNAL_ERROR_CODE).json({ message: HTTPMessages.genericError });
  }
};
