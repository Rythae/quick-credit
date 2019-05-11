import { Router } from 'express';
import LoansController from '../controllers/loans';
import tokenVerification from '../middlewares/tokenVerification';
import loanRequestValidator from '../middlewares/loanRequestValidator';
import verifyAdmin from '../middlewares/verifyAdmin';

const loansRouter = Router();

const { createLoanRequest, getAllLoans, getSingleLoan } = LoansController;

loansRouter.get('/',
  tokenVerification,
  verifyAdmin,
  getAllLoans);

loansRouter.post('/',
  tokenVerification,
  loanRequestValidator,
  createLoanRequest);

loansRouter.get('/:loanId',
  tokenVerification,
  getSingleLoan);

export default loansRouter;
