import userSignupJoiSchema from './joiSchemas/userSignup';
import joi from 'joi';

/**
 * @param  {Object} req - the request object
 * @param  {Object} res - the response object
 * @return {JsonResponse} - the json response
 */
const userSignupValidator = async (req, res, next) => {
  try {
    await joi.validate(req.body, userSignupJoiSchema);
    next();
  } catch(error) {
    return res.status(422).send({
      status: 'failed',
      message: 'wrong input provided',
      error: error.details[0].message
    });
  }
};


export default userSignupValidator;