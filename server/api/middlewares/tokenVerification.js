import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
 * @param  {Object} req - the request object
 * @param  {Object} res - the response object
 * @param  {Function} next - switch to the next route middleware
 * @return {JsonResponse} - the json response
 */
const tokenVerification = (req, res, next) => {
  const token = req.headers.authorization || req.query.token;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).send({
          status: 'fail',
          message: 'invalid token'
        });
      }
      req.user = decoded;
      next();
    });
  } else {
    return res.status(403).send({
      status: 'fail',
      message: 'no token found'
    });
  }
};

export default tokenVerification;
