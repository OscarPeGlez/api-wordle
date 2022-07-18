import 'reflect-metadata';
import app from './app';
import AppDateSource from './db';
import job from './jobs/job';

const PORT: number = 3000;

const main = async () => {
  try {
    await AppDateSource.initialize();
    console.info('Database connected');
    app.listen(PORT);
    job.shopRefresh();
    console.info(`Server is listening on port ${PORT}`);
  } catch (error) {
    console.error('Unexpected Error: ', error);
  }
};

main();
