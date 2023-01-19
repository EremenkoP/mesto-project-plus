import express from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import rateLimit from 'express-rate-limit';
import authMiddleware from './middlewares/auth';
import errorMiddleware from './middlewares/error';
import { DEFAULT_PORT, DEFAULT_DB_URL } from './utils/const';
import { errorLogger, requestLogger } from './middlewares/logger';
import { createUser, login } from './controllers/users';
import router from './routers/index';

const { PORT = DEFAULT_PORT, BD_URL = DEFAULT_DB_URL } = process.env;

const limiter = rateLimit({
  windowMs: 16 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const app = express();
app.use(limiter);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(requestLogger);

app.post('/signin', login);
app.post('/signup', createUser);

app.use(authMiddleware);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorMiddleware);

// Проверка что все работает
mongoose.connect(BD_URL)
  .then(() => console.log('Connected to mestodb'))
  .catch((err) => console.error('Error BD:', err.message));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
