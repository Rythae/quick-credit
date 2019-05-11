const loans = [
  {
    id: 1,
    email: 'quickuser1@quick-cred.test',
    tenor: 2,
    amount: 10000,
    paymentInstallment: 10500 / 2,
    repaid: false,
    status: 'approved',
    interest: 500,
    userId: 1,
    balance: 0,
    createdOn: new Date(),
  },
  {
    id: 2,
    email: 'quickuser3@quick-cred.test',
    tenor: 2,
    amount: 10000,
    paymentInstallment: 10500 / 2,
    repaid: false,
    status: 'approved',
    interest: 500,
    userId: 3,
    balance: 3000,
    createdOn: new Date(),
  }
];

export default loans;