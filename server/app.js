import winston from 'winston';
import express from 'express';
import cors from 'cors';
import morganLogger from 'morgan';
import bodyParser from 'body-parser';
import routes from './api/routes';
import loansRouter from './api/routes/loans';
import usersRouter from './api/routes/users';
import authRouter from './api/routes/auth';


const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
  ]
});

const app = express();

app.use(morganLogger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/loans', loansRouter);
app.use('/api/v1/users', usersRouter);

app.use('/api/v1', routes);

app.get('/', (req, res) => res.status(200).json({
  message: 'Welcome to Quick Credit!'
}));

app.use('*', (req, res) => res.status(404).json({
  message: 'Route not found',
}));

// handling all the request errors
app.use((err, req, res, next) => {
  logger.info(err.stack);
  const { statusCode, errorResponse } = err;

  next();
  return res.status(statusCode).json(errorResponse);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  logger.info(`app listening on port ${port}`);
});

export default app;
