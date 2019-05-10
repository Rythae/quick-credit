import loans from '../../dummyModels/loans';

/**
 * @exports
 * @class LoansController
 *
 */
class LoansController {
  /**
   * @staticmethod
   * @param {object} req - Request object
   * @param {object} resp - Response object
   * @return {json} resp.json
   */
  static async getAUsersLoan(req, resp) {
    return resp.status(200).send({
      status: 'success',
      message: 'Loans returned successfully',
      loans: loans
    });
  }
}

export default LoansController;
