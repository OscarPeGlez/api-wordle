import { UpdateResult } from 'typeorm';
import Word from '../entities/Word';

export default class WordDAO {
  static async saveWord(word: Word): Promise<Word> {
    console.debug('DAO: Starting saveWord method');
    const result: Word = await word.save();
    console.debug('DAO: Ending saveWord method');
    return result;
  }

  static async findByData(data: any): Promise<Word | null> {
    console.debug('DAO: Starting findByData method', data);
    const result: Word | null = await Word.findOneBy(data);
    console.debug('DAO: Ending findByData method');
    return result;
  }

  static async updateWord(wordId: number, data: any): Promise<UpdateResult> {
    console.debug('DAO: Starting updateWord method', data);
    const result: UpdateResult = await Word.update({ id: wordId }, data);
    console.debug('DAO: Ending updateWord method');
    return result;
  }

  static async findRandomWord(): Promise<Word | null> {
    console.debug('DAO: Starting findRandomWord method');
    return Word.getRepository()
      .createQueryBuilder('word')
      .where('word.value like :length', { length: '_____' })
      .andWhere('word.isCurrent = false')
      .orderBy('random()')
      .getOne();
  }

  static async getMostGuessedWord(): Promise<Word[]> {
    console.debug('DAO: getMostGuessedWord updateAll method');
    const result: Word[] = await Word.getRepository()
      .createQueryBuilder('word')
      .orderBy('word.hits', 'DESC')
      .limit(10)
      .getMany();
    console.debug('DAO: Ending getMostGuessedWord method');
    return result;
  }
}
