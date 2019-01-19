// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';

// dotenv.config();

// export default (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(' ')[1];
//     const decoded = jwt.verify(token, process.env.JWT_KEY);
//     req.userData = decoded;
//     next();
//   } catch (e) {
//     res.status(401).json({
//       status: '401',
//       message: 'Auth failed',
//       error: e,
//     });
//   }
// };

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import dbQuery from '../db/dbquery';

dotenv.config();

/**
   * Verify Token
   * @param {object} req 
   * @param {object} res 
   * @param {object} next
   * @returns {object|void} response object 
   */

const badRequest = { status: '400', message: 'Bad Request' };
const notFound = { status: '404', message: 'Not Found' };

const verifyToken = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    badRequest.description = 'Token not provided';
    return res.status(400).send(badRequest);
  }
  try {
    const decoded = await jwt.verify(token, process.env.JWT_KEY);
    const selectUser = 'SELECT * FROM users WHERE id = $1';
    const { rows } = await dbQuery.query(selectUser, [decoded.user_id]);
    const dbResponse = rows[0];
    if(!dbResponse) {
      badRequest.description = 'The token you provided is invalid';
      return res.status(400).send(badRequest);
    }
    req.user = { userId: decoded.user_id };
    next();
  } catch (error) {
    return res.status(400).send(error);
  }
  return res.status(404).send(notFound);
};


export default verifyToken;
