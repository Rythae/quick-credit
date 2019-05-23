import { Pool } from 'pg';
import dotenv from 'dotenv';
import logger from '../services/logger';
// import connectionString from './config';

dotenv.config();

let connectionString;
if (process.env.NODE_ENV === 'development') {
  connectionString = process.env.DATABASE_DEV_URL;
} else if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.DATABASE_TEST_URL;
} else {
  connectionString = process.env.DATABASE_PRODUCTION_URL;
}

logger.info(`Node Environment: ${process.env.NODE_ENV}`);
// export default connectionString;

const db = new Pool({
  connectionString
});


export default db;

// export default {
//   /**
//    * DB Query
//    * @param {String} text - query text
//    * @param {*} params - query params
//    * @returns {Promise} query promise
//    */
//   query(text, params) {
//     return new Promise((resolve, reject) => {
//       pool.query(text, params)
//         .then((res) => {
//           resolve(res);
//         })
//         .catch((err) => {
//           reject(err);
//         });
//     });
//   }
// };
