import LoanModel from '../../models/Loan';
import RepaymentModel from '../../models/Repayment';
import ResponseHelper from '../utils/ResponseHelper';


const Repayment = new RepaymentModel();
const Loan = new LoanModel();
/**
 * @exports
 * @class RepaymentsController
 *
 */
class RepaymentsController {
  /**
   * @static
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @return {JSON} res.json
   */
  static async getRepaymentsForALoan(req, res) {
    const { loanId } = req.params;

    const loanRepayments = await Repayment.getByField('loanId', loanId);

    ResponseHelper.success(res, 200, loanRepayments);
  }

  /**
   * @static
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @return {JSON} res.json
   */
  static async postRepaymentsForALoan(req, res) {
    const { amount } = req.body;
    const { loanId } = req.params;
    const loan = await Loan.getById(loanId);

    const newRepayment = await Repayment.create({
      loanId,
      amount,
      monthlyInstallment: loan.paymentInstallment
    });

    ResponseHelper.success(res, 201, newRepayment);
  }
}
export default RepaymentsController;
