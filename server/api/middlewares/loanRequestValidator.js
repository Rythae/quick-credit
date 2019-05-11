import joi from 'joi';
import loanRequestSchema from './joiSchemas/loanRequest';

/**
 * @param  {Object} req - the request Object
 * @param  {Object} res - the response object
 * @param  {Function} next - switch to the next route middleware
 * @return {JsonResponse} - the json response
 */
const loanRequestValidator = async (req, res, next) => {
  try {
    await joi.validate(req.body, loanRequestSchema);
    next();
  } catch (error) {
    return res.status(422).send({
      status: 'failed',
      message: 'wrong input provided',
      error: error.details[0].message

    });
  }
};


export default loanRequestValidator;
