import db from '../db';
import logger from '../services/logger';

/**
 * export
 */
class Loan {
  /**
   * Create A Loan
   * @param {object} data
   * @returns {object} new record
   */
  async create(data) {
    const createQuery = `INSERT INTO
      loans("email", "tenor", "amount", "paymentInstallment", "repaid", "status", "interest", "userId", "balance")
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
      returning *`;
    const values = [
      data.email,
      data.tenor,
      data.amount,
      data.paymentInstallment,
      data.repaid,
      data.status,
      data.interest,
      data.userId,
      data.balance,
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      return rows[0];
    } catch (error) {
      return error;
    }
  }

   /**
   * Get Loan by id
   * @param {String} id - the id primary key
   * @returns {object} record object
   */
  async getById(id) {
    const text = 'SELECT * FROM loans WHERE id = $1';
    try {
      const { rows } = await db.query(text, [id]);
      return rows[0];
    } catch (error) {
      return error;
    }
  }

  /**
   * Get Loan by a field
   * @param {String} field - the field
   * @param {String} value - the value
   * @returns {object} record object
   */
  async getByField(field, value) {
    const text = `SELECT * FROM loans WHERE "${field}" = $1`;
    
    try {
      const { rows } = await db.query(text, [value]);
      return rows[0];
    } catch (error) {
      return error;
    }
  }

/**
   * Get Approved Loans
   * @returns {object} records
   */
  async getApprovedLoans() {
    const text = "SELECT * FROM loans WHERE status = 'approved' AND repaid = true";
    try {
      const { rows } = await db.query(text);
      return rows;
    } catch (error) {
      return error;
    }
  }

  /**
   * Get Current Loans
   * @returns {Array} records
   */
  async getCurrentLoans() {
    const text = "SELECT * FROM loans WHERE status = 'approved' AND repaid = false";
    try {
      const { rows } = await db.query(text);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get All Loans
   * @returns {Array} records
   */
  async getAllLoans() {
    const text = "SELECT * FROM loans WHERE status = 'approved' AND repaid = false";
    try {
      const { rows } = await db.query(text);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get User Loans
   * @param {String} userId - the user's id
   * @returns {Array} records
   */
  async getUserLoans(userId) {
    const text = `SELECT * FROM loans WHERE "userId" = '${userId}'`;
    try {
      const { rows } = await db.query(text);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async changeLoanStatus (status, id) {
  const text = `UPDATE loans SET status = '${status}' WHERE id = '${loanld}' returning *`;
  try {
      const response = await db.query(text, [status, id]);
      return response.rows[0];
    } catch(err) {
      console.log(err);
      return err;
    }
  }




}


export default Loan;
