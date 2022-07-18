import { UpdateResult } from 'typeorm';
import User from '../entities/User';

export default class UserDAO {
  static async saveUser(user: User): Promise<User> {
    console.debug('DAO: Starting saveUser method');
    const result: User = await user.save();
    console.debug('DAO: Ending saveUser method');
    return result;
  }

  static async findByData(data: any): Promise<User | null> {
    console.debug('DAO: Starting findByData method', data);
    const result: User | null = await User.findOneBy(data);
    console.debug('DAO: Ending findByData method');
    return result;
  }

  static async updateUser(wordId: number, user: any): Promise<UpdateResult> {
    console.debug('DAO: Starting updateUser method', user);
    const result: UpdateResult = await User.update({ id: wordId }, user);
    console.debug('DAO: Ending updateUser method');
    return result;
  }

  static async updateAll(): Promise<UpdateResult> {
    console.debug('DAO: Starting updateAll method');
    const result: UpdateResult = await User.update({}, { userAttempts: 0, isWinner: false });
    console.debug('DAO: Ending updateAll method');
    return result;
  }

  static async getBestUsers(): Promise<User[]> {
    console.debug('DAO: getBestUsers updateAll method');
    const result: User[] = await User.getRepository()
      .createQueryBuilder('user')
      .orderBy('user.wins', 'DESC')
      .limit(10)
      .getMany();
    console.debug('DAO: Ending getBestUsers method');
    return result;
  }
}
