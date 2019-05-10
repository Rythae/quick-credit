import loans from '../../dummyModels/loans';
import users from '../../dummyModels/users';

/**
 * @exports
 * @class LoansController
 *
 */
class LoansController {
  /**
   * @staticmethod
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static async getAUsersLoan(req, res) {
    return res.status(200).send({
      status: 'success',
      data: loans,
    });
  }

  /**
   * @staticmethod
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @return {JonResponse} - json response with status code
   */
  static async createLoanRequest(req, res) {
    const lastLoan = loans[loans.length - 1];
    const nextLoanId = lastLoan ? lastLoan.id + 1 : 1;
    const user = users.find(item => item.id === req.user.id);

    const { amount, tenor } = req.body;
    const interest = (5 / 100) * amount;
    const repaymentAmount = Number(amount) + interest;

    const newLoan = {
      id: nextLoanId,
      email: user.email,
      tenor,
      amount,
      paymentInstallment: repaymentAmount / tenor,
      repaid: false,
      status: 'pending',
      interest,
      createdOn: new Date()
    };

    loans.push(newLoan);

    return res.status(201).send({
      status: 'success',
      data: newLoan,
    });
  }
}

export default LoansController;
