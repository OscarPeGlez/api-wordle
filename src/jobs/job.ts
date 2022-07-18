/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-empty-function */
import * as schedule from 'node-schedule';
import { TIME_CHANGE_WORD } from '../commons/constants/system';
import UserDAO from '../persistence/daos/user.dao';
import WordDAO from '../persistence/daos/word.dao';

class Job {
  constructor() {}

  public shopRefresh() {
    const minutes: number = TIME_CHANGE_WORD ? parseInt(TIME_CHANGE_WORD, 10) : 5;

    const rule = new schedule.RecurrenceRule();
    rule.minute = new schedule.Range(0, 59, minutes);
    schedule.scheduleJob(rule, async () => {
      console.debug('Start cron at', new Date());

      try {
        const newWord = await WordDAO.findRandomWord();
        const currentWord = await WordDAO.findByData({ isCurrent: true });

        if (currentWord) await WordDAO.updateWord(currentWord.id, { isCurrent: false });

        if (newWord !== null) {
          await WordDAO.updateWord(newWord.id, { isCurrent: true });
        }

        await UserDAO.updateAll();
      } catch (error) {
        throw new Error('Unexpected Error');
      }
    });
  }
}

export default new Job();
