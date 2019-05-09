import { Router } from 'express';
import UsersController from './controllers/users';
import userSignupValidator from './middlewares/userSignupValidator';
import userSigninValidator from './middlewares/userSigninValidator';


const routes = Router();

// const { userSignup, userSignin } = UsersController;

routes.post('/auth/signup', userSignupValidator, UsersController.userSignup);
routes.post('/auth/signin', userSigninValidator, UsersController.userSignin);


export default routes;
