import { DataSource } from 'typeorm';
import { ConfigDB } from './commons/constants/system';
import User from './persistence/entities/User';
import Word from './persistence/entities/Word';

const AppDateSource = new DataSource({
  ...ConfigDB,
  entities: [User, Word],
});

export default AppDateSource;
