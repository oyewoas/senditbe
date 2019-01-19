import moment from 'moment';

import dbQuery from '../db/dbquery';

import {
  hashPassword,
  comparePassword,
  isValidEmail,
  validatePassword,
  isEmpty,
  generateToken,
} from '../helpers';

// dotenv.config();

const badRequest = { status: '400', message: 'Bad Request' };
const notFound = { status: '404', message: 'Not Found' };
const internalserverError = { status: '500', message: 'Internal Server Error' };
const conflictExists = { status: '409', message: 'Conflict' };


/**
   * Create A User
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object 
   */
const createUser = async (req, res) => {
  const { email, username, password } = req.body;
  const registered = moment(new Date());
  if (isEmpty(email) || isEmpty(username) || isEmpty(password)) {
    badRequest.description = 'Email, password and username field cannot be empty';
    res.status(400).send(badRequest);
  }
  if (!isValidEmail(email) || !validatePassword(password)) {
    badRequest.description = 'Please enter a valid Email or Password';
    res.status(400).send(badRequest);
  }
  const hashedPassword = hashPassword(password);
  const createUserQuery = `INSERT INTO
      users(email, username, password, registered)
      VALUES($1, $2, $3, $4)
      returning *`;
  const values = [
    email,
    username,
    hashedPassword,
    registered,
  ];

  try {
    const { rows } = await dbQuery.query(createUserQuery, values);
    const dbResponse = rows[0];
    const token = generateToken(dbResponse.email, dbResponse.user_id);
    const replySignUp = { status: '201', data: [] };
    const message = 'User Created Successfully';
    replySignUp.data.push({
      token,
      user: {
        user_id: dbResponse.user_id,
        username: dbResponse.username,
      },
      message,
    });
    return res.status(201).send(replySignUp);
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      badRequest.description = 'User with that EMAIL already exist';
      return res.status(400).send(badRequest);
    }
    return res.status(400).send(error);
  }
};

/**
   * Login
   * @param {object} req 
   * @param {object} res
   * @returns {object} user object 
   */
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (isEmpty(email) || isEmpty(password)) {
    badRequest.description = 'Email or Password detail is missing';
    return res.status(400).send(badRequest);
  }
  if (!isValidEmail(email) || !validatePassword(password)) {
    badRequest.description = 'Please enter a valid Email or Password';
    res.status(400).send(badRequest);
  }
  const loginUserQuery = 'SELECT * FROM users WHERE email = $1';
  try {
    const { rows } = await dbQuery.query(loginUserQuery, [email]);
    const dbResponse = rows[0];
    if (!dbResponse) {
      badRequest.description = 'The credentials you provided is incorrect';
      return res.status(400).send(badRequest);
    }
    if (!comparePassword(dbResponse.password, password)) {
      badRequest.description = 'The credentials you provided is incorrect';
      return res.status(400).send(badRequest);
    }
    const token = generateToken(dbResponse.email, dbResponse.user_id);
    const replySignUp = { status: '201', data: [] };
    const message = 'User Logged In Successfully';
    replySignUp.data.push({
      token,
      user: {
        user_id: dbResponse.user_id,
        username: dbResponse.username,
      },
      message,
    });
    return res.status(201).send(replySignUp);
  } catch (error) {
    return res.status(400).send(error);
  }
};
export { createUser, loginUser };
