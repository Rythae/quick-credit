import { Router } from 'express';
import authRouter from './auth';
import loansRouter from './loans';
import LoansController from '../controllers/loans';


const routes = Router();

routes.use('/auth', authRouter);
routes.use('/loans', loansRouter);
routes.get('/loans',LoansController.getAUsersLoan);


export default routes;
