import joi from 'joi';

const amount = joi.string().trim().strict().min(4).max(11).required();
const tenor = joi.number().positive().min(1).max(12).required();

const loanRequestSchema = {
  amount,
  tenor,
};

export default loanRequestSchema;
