import bcrypt from 'bcryptjs';

const users = [
  {
    id: 1,
    email: 'quickuser1@quick-cred.test',
    firstName: 'Rita',
    lastName: 'Smith',
    password: bcrypt.hashSync('dummypass123', 10),
    address: '5, Smith Road, Smith Town',
    isAdmin: false,
    status: 'verified'
  },
  {
    id: 2,
    email: 'quickuser2@quick-cred.test',
    firstName: 'Jane',
    lastName: 'Dough',
    password: bcrypt.hashSync('dummypass123', 10),
    address: '7, Smith Road, Smith Town',
    isAdmin: true,
    status: 'verified'
  }
];

export default users;