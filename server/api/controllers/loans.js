/* eslint-disable radix */
import loans from '../../dummyModels/loans';
import LoanModel from '../../models/Loan';
import ResponseHelper from '../utils/ResponseHelper';

const Loan = new LoanModel();

/**
 * @exports
 * @class LoansController
 *
 */
class LoansController {
  
  /**
   * @static
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @return {JonResponse} - json response with status code
   */
  static async createLoanRequest(req, res) {
    const { email, id: userId } = req.user;

    const { amount, tenor } = req.body;
    const interest = (5 / 100) * amount;
    const repaymentAmount = Number(amount) + interest;

    const newLoan = await Loan.create({
      email,
      tenor,
      amount,
      // eslint-disable-next-line radix
      paymentInstallment: parseInt(repaymentAmount / tenor),
      repaid: false,
      status: 'pending',
      interest: parseInt(interest),
      userId,
      balance: parseInt(repaymentAmount),
    });

    ResponseHelper.success(res, 201, newLoan);
    // return res.status(201).json({                                                                               
    //   status: 201,
    //   data: newLoan,
    // });
  }

  
}

export default LoansController;
