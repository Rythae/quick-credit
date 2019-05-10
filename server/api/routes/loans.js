import { Router } from 'express';
import LoansController from '../controllers/loans';
import tokenVerification from '../middlewares/tokenVerification';
import loanRequestValidator from '../middlewares/loanRequestValidator';

const loansRouter = Router();

const { createLoanRequest } = LoansController;

loansRouter.post('/',
  tokenVerification,
  loanRequestValidator,
  createLoanRequest);

export default loansRouter;
