import { Request, Response } from 'express';
import moment from 'moment';
import {
  BAD_REQUEST_CODE, CONFLICT_CODE, INTERNAL_ERROR_CODE, NOT_FOUNT_CODE, TIME_CHANGE_WORD, USER_ATTEMPTS,
} from '../commons/constants/system';
import { HTTPMessages } from '../commons/constants/messages';
import Utilities from '../commons/utils/utilities';
import UserDAO from '../persistence/daos/user.dao';
import WordDAO from '../persistence/daos/word.dao';
import User from '../persistence/entities/User';

const userAttempts: number = USER_ATTEMPTS ? parseInt(USER_ATTEMPTS, 10) : 5;

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;

    if (!username) return res.status(BAD_REQUEST_CODE).json(HTTPMessages.missingUsername);

    const user: User = new User();
    user.username = username;

    const userExists = await UserDAO.findByData({ username });

    if (userExists !== null) return res.status(CONFLICT_CODE).json(HTTPMessages.userExists);
    await UserDAO.saveUser(user);

    return res.json(user);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(INTERNAL_ERROR_CODE).json({ message: error.message });
    }

    return res.status(INTERNAL_ERROR_CODE).json({ message: HTTPMessages.genericError });
  }
};

export const validateWord = async (req: Request, res: Response) => {
  try {
    const { word } = req.body;
    const { username } = req.body;

    if (!word) return res.status(BAD_REQUEST_CODE).json(HTTPMessages.missingWord);
    if (!username) return res.status(BAD_REQUEST_CODE).json(HTTPMessages.missingUsername);
    if (word.length !== 5) { return res.status(BAD_REQUEST_CODE).json(HTTPMessages.errorWord); }

    const currentWord = await WordDAO.findByData({ isCurrent: true });
    if (!currentWord) return res.status(INTERNAL_ERROR_CODE).json(HTTPMessages.gameNotAvailable);

    const nextDateWord = moment(currentWord.updatedAt).add(TIME_CHANGE_WORD, 'm').toDate();

    const user = await UserDAO.findByData({ username });

    if (!user) return res.status(NOT_FOUNT_CODE).json(HTTPMessages.userNotFound);
    if (user.userAttempts === userAttempts || user.isWinner) { return res.status(BAD_REQUEST_CODE).json(`Next Word at ${nextDateWord}`); }

    const solutionWord: string = currentWord.value;

    const response = Utilities.getResultAttemp(word, solutionWord);

    if (word === solutionWord) {
      await WordDAO.updateWord(currentWord.id, {
        hits: currentWord.hits + 1,
      });
      await UserDAO.updateUser(user.id, {
        wins: user.wins + 1,
        matchs: user.matchs + 1,
        userAttempts: user.userAttempts + 1,
        isWinner: true,
      });
    }

    if (user.userAttempts === 4) {
      await UserDAO.updateUser(user.id, { matchs: user.matchs + 1 });
    }

    await UserDAO.updateUser(user.id, {
      userAttempts: user.userAttempts + 1,
    });
    return res.json(response);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(INTERNAL_ERROR_CODE).json({ message: error.message });
    }

    return res.status(INTERNAL_ERROR_CODE).json({ message: HTTPMessages.genericError });
  }
};

export const getStatistics = async (req: Request, res: Response) => {
  try {
    const { idUser } = req.params;

    if (!idUser) return res.status(BAD_REQUEST_CODE).json(HTTPMessages.missingQueryParam);

    const user = await UserDAO.findByData({ id: parseInt(idUser, 10) });

    if (!user) return res.status(NOT_FOUNT_CODE).json(HTTPMessages.userNotFound);

    return res.json({ totalMatches: user.matchs, totalWins: user.wins });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(INTERNAL_ERROR_CODE).json({ message: error.message });
    }

    return res.status(INTERNAL_ERROR_CODE).json({ message: HTTPMessages.genericError });
  }
};

export const getTopUsers = async (req: Request, res: Response) => {
  try {
    const users: User[] = await UserDAO.getBestUsers();

    const result = users.map((user) => ({
      id: user.id,
      username: user.username,
      totalWins: user.wins,
    }));
    return res.json(result);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(INTERNAL_ERROR_CODE).json({ message: error.message });
    }

    return res.status(INTERNAL_ERROR_CODE).json({ message: HTTPMessages.genericError });
  }
};
