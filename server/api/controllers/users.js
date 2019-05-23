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



  }

export default UsersController;
