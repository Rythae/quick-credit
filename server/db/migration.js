import logger from '../services/logger';
import db from '../db';
import seedDatabase from './seed';

const queryText = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS repayments;
DROP TABLE IF EXISTS loans;

CREATE TABLE IF NOT EXISTS users (
  "id" UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
  "firstName" VARCHAR(100) NOT NULL,
  "lastName" VARCHAR(100),
  "email" VARCHAR(100) UNIQUE NOT NULL,
  "isAdmin" BOOLEAN NOT NULL,
  "password" VARCHAR(100) NOT NULL,
  "address" TEXT NOT NULL,
  "status" VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS loans (
  "id" UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
  "email" VARCHAR(100) NOT NULL,
  "tenor" INTEGER NOT NULL,
  "amount" VARCHAR(11) NOT NULL,
  "paymentInstallment" VARCHAR(11) NOT NULL,
  "repaid" BOOLEAN NOT NULL,
  "status" VARCHAR(11) NOT NULL,
  "interest" VARCHAR(11) NOT NULL,
  "userId" UUID NOT NULL,
  "balance" VARCHAR(11) NOT NULL,
  "createdOn" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS repayments (
  "id" UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
  "loanId" UUID NOT NULL,
  "amount" VARCHAR(11) NOT NULL,
  "monthlyInstallment" VARCHAR(11) NOT NULL,
  "createdOn" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
);
`;


+

db.query(queryText)
  .then(result => { logger.info(result);
  db.on('connect', () => {
  logger.info('CONNECTED TO DATABASE');
  seedDatabase();
});})
  .catch(error => logger.error(error));

