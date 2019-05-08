import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import users from '../../dummyModels/users';

dotenv.config();

/**
 * @export
 */
class UsersController {
  /**
   * @param  {Object} req - the request object
   * @param  {Object} res - the response object
   * @return {JsonResponse} - the json response
   */
  static userSignup(req, res) {
    const lastUser = users[users.length - 1];
    const nextUserId = lastUser.id + 1;

    const {
      email,
      password,
      firstName,
      lastName,
      address
    } = req.body;

    const newUser = {
      id: nextUserId,
      email,
      password: bcrypt.hashSync(password, 10),
      firstName,
      lastName,
      address,
      isAdmin: false,
      status: 'unverified'
    };

    users.push(newUser);

    delete newUser.password;
    return res.status(201).send({
      status: 'success',
      data: newUser
    });
  }
}


export default UsersController;
