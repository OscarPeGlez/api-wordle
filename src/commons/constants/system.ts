/* eslint-disable camelcase */
import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';

const {
  DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_DATABASE, NODE_RUN_ENV,
} = process.env;

export const { TIME_CHANGE_WORD, USER_ATTEMPTS } = process.env;

const db_type = 'postgres';
const db_host = DB_HOST;
const db_username = DB_USERNAME;
const db_password = DB_PASSWORD;
const db_port = DB_PORT ? parseInt(DB_PORT, 10) : 5432;
const db_database = DB_DATABASE;
const isDEv = NODE_RUN_ENV === 'dev';

export const ConfigDB: DataSourceOptions = {
  type: db_type,
  host: db_host,
  username: db_username,
  password: db_password,
  port: db_port,
  database: db_database,
  logging: isDEv,
  synchronize: isDEv,
};

export const OK_CODE = 200;
export const CREATED_CODE = 201;
export const NOT_CONTENT_CODE = 204;

export const BAD_REQUEST_CODE = 400;
export const NOT_FOUNT_CODE = 404;
export const CONFLICT_CODE = 409;

export const INTERNAL_ERROR_CODE = 500;

export default null;
