/* eslint-disable radix */
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
  }

  /**
   * @static
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static async getAllUserLoans(req, res) {
    const userId = req.user.id;
    const userLoans = await Loan.getUserLoans(userId);

    ResponseHelper.success(res, 200, userLoans);
  }

  /**
   * @static
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static async getAllLoans(req, res) {
    // get all repayments under each loan
    const { status, repaid } = req.query;

    let allLoans;
    if (status === 'approved' && repaid === 'true') {
      allLoans = await Loan.getApprovedLoans();
    } else if (status === 'approved' && repaid === 'false') {
      allLoans = await Loan.getCurrentLoans();
    } else {
      allLoans = await Loan.getAllLoans();
    }

    ResponseHelper.success(res, 200, allLoans);
  }

  /**
   * @static
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @return {JonResponse} - json response with status code
   */
  static async getSingleLoan(req, res) {
    const { loanId } = req.params;

    const loan = await Loan.getById(loanId);

    ResponseHelper.success(res, 200, loan);
  }

  /**
   * @static
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @return {JonResponse} - json response with status code
   */
  static async changeLoanStatus(req, res) {
    const { loanId } = req.params;
    const { status } = req.body;

    const loan = await Loan.changeLoanStatus(status, loanId);

    if (!loan) {
      ResponseHelper.error(res, 404, {
        message: 'loan not found'
      });
    }
    ResponseHelper.success(res, 200, loan);
  }
}

export default LoansController;
