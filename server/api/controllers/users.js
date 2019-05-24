import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserModel from '../../models/User';
import hashPassword from '../utils/hash';
import ResponseHelper from '../utils/ResponseHelper';


const User = new UserModel();
/**
 * @export
 */
class UsersController {
  /**
   * @param  {Object} req - the request object
   * @param  {Object} res - the response object
   * @return {JsonResponse} - the json response
   */
  static async userSignup(req, res) {
    const {
      email,
      password,
      firstName,
      lastName,
      address
    } = req.body;
    const userExists = await User.getByField('email', email);

    if (userExists) {
      ResponseHelper.error(res, 409, {
        message: 'User already exists'
      });
    } else {
      const expiryTime = 60 * 60; // 1 hour

      const newUser = await User.create({
        email,
        password: hashPassword(password),
        firstName,
        lastName,
        address,
        isAdmin: false,
        status: 'unverified',
      });

      const token = await jwt.sign(
        {
          id: newUser.id,
          email,
          isAdmin: false,
        },
        process.env.JWT_SECRET,
        { expiresIn: expiryTime }
      );

      delete newUser.password;
      const newUserWithToken = Object.assign(newUser, {
        token
      });
      ResponseHelper.success(res, 201, newUserWithToken);
    }
  }


  /**
   * @param  {Object} req - the request object
   * @param  {Object} res - the response object
   * @return {JsonResponse} - the json response
   */
  static async userSignin(req, res) {
    const { email, password } = req.body;
    const user = await User.getByField('email', email);
    const isCorrectPassword = user && await bcrypt.compareSync(password, user.password);
    if (!user) {
      ResponseHelper.error(res, 404, {
        message: 'user not found'
      });
    } else if (!isCorrectPassword) {
      ResponseHelper.error(res, 401, {
        message: 'Invalid username or password'
      });
    } else {
      const expiryTime = 60 * 60; // 1 hour

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET,
        { expiresIn: expiryTime }
      );

      const data = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token
      };

      ResponseHelper.success(res, 200, data);
    }
  }

  /**
   * @param  {Object} req - the request object
   * @param  {Object} res - the response object
   * @return {JsonResponse} - the json response
   */
  static async userVerify(req, res) {
    const { email } = req.params;
    const user = await User.verifyUser(email);
    delete user.password;
    ResponseHelper.success(res, 200, user);
  }
}

export default UsersController;
