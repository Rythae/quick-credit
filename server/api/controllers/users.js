import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import users from '../../dummyModels/users';
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

    const newUser = await User.create({
      email,
      password: hashPassword(password),
      firstName,
      lastName,
      address,
      isAdmin: false,
      status: 'unverified'
    });

    delete newUser.password;
    ResponseHelper.success(res, 201, newUser);
    // return res.status(201).json({
    //   status: 201,
    //   data: newUser
    // });
  }


  /**
   * @param  {Object} req - the request object
   * @param  {Object} res - the response object
   * @return {JsonResponse} - the json response
   */
  static async userSignin(req, res) {
    const { email, password } = req.body;
    const user = await User.getByField('email', email);

    if (!user) {
      ResponseHelper.error(res, 401);
      // return res.status(401).json({
      //   status: 401,
      //   message: 'wrong login data'
      // });
    }

    const isCorrectPassword = await bcrypt.compareSync(password, user.password);

    if (!isCorrectPassword) {
      ResponseHelper.error(res, 401);
      // return res.status(401).json({
      //   status: 401,
      //   message: 'wrong login data'
      // });
    }

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
    // return res.status(200).json({
    //   status: 200,
    //   message: 'login successful', 
    //   data
    // });
  }

  }

export default UsersController;
