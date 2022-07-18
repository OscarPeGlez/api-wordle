import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import userRoutes from './routes/user.route';
import wordRoutes from './routes/word.route';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/words', wordRoutes);

export default app;
