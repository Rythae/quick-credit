import { Router } from 'express';
import userSignupValidator from './middlewares/userSignupValidator';
import UsersController from './controllers/users';

const routes = Router();

const { userSignup } = UsersController;

routes.post('/auth/signup', userSignupValidator, userSignup);


export default routes;
