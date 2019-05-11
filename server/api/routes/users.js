import { Router } from 'express';
import LoansController from '../controllers/loans';
import tokenVerification from '../middlewares/tokenVerification';
import verifyUser from '../middlewares/verifyUser';

const usersRouter = Router();

const { getAllUserLoans } = LoansController;

usersRouter.get('/:userId/loans', tokenVerification, verifyUser, getAllUserLoans);

export default usersRouter;
