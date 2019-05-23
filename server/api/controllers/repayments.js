import loans from '../../dummyModels/loans';
import LoanModel from '../../models/Loan';
import RepaymentModel from '../../models/Repayment';
import repayments from '../../dummyModels/repayments';
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

    const loan = Loan.getById(loanId);
    const loanRepayments = await Repayment.getByField('loanId', loanId);

    ResponseHelper.success(res, 200, loanRepayments);
    // return res.status(200).json({
    //   status: 200,
    //   data: loanRepayments,
    // });
  }

  /**
   * @static
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @return {JSON} res.json
   */
  static async postRepaymentsForALoan(req, res) {
    const {
      loanId,
      amount,
      monthlyInstallment
    } = req.body;

    const newRepayment = await Repayment.create({
      loanId,
      amount,
      monthlyInstallment
    });

    ResponseHelper.success(res, 201, newRepayment);
    // return res.status(201).json({
    //   status: 201,
    //   data: newRepayment
    // });
  }
}
export default RepaymentsController;
