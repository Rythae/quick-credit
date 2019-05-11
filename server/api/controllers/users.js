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


  /**
   * @param  {Object} req - the request object
   * @param  {Object} res - the response object
   * @return {JsonResponse} - the json response
   */
  static async userSignin(req, res) {
    const { email, password } = req.body;
    const user = users.find(item => item.email === email);

    if (!user) {
      return res.status(401).send({
        status: 'fail',
        message: 'wrong login data'
      });
    }

    const passwordsMatch = await bcrypt.compareSync(password, user.password);

    if (!passwordsMatch) {
      return res.status(401).send({
        status: 'fail',
        message: 'wrong login data'
      });
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
      token
    };

    return res.status(200).send({
      status: 'success',
      message: 'login successful',
      data
    });
  }
}

export default UsersController;
