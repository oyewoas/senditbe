
// import dotenv from 'dotenv';
// import pool from '../db/pool';
// import { isEmpty } from './validation';

// dotenv.config();

// const badRequest = { status: '400', message: 'Bad Request' };
// const notFound = { status: '404', message: 'Not Found' };
// const internalserverError = { status: '500', message: 'Internal Server Error' };
// const conflictExists = { status: '409', message: 'Conflict' };

// const createParcel = (req, res) => {
//   const {
//     weight, weightmetric, parcelName, fromAddress, toAddress,
//   } = req.body;
//   const sentOn = new Date();
//   const placedBy = req.params;
//   if (isEmpty(weight) || isEmpty(weightmetric) || isEmpty(parcelName) || isEmpty(fromAddress) || isEmpty(toAddress)) {
//     badRequest.description = 'All stared details must be filled';
//     res.status(400).send(badRequest);
//   } else {
//     pool.query('INSERT INTO parcels(placedby, parcelName, weight, weightmetric, sentOn, fromAddress, toAddress) values($1, $2, $3, $4, $5, $6)',
//       [placedBy, parcelName, weight, weightmetric, sentOn, fromAddress, toAddress], (error) => {
//         if (error) {
//             console.log(error);
//           internalserverError.description = 'Could not create parcel';
//           res.status(500).send(internalserverError);
//         } else {
//           pool.query('SELECT * FROM parcels WHERE parcelBy = ($1) ORDER BY parcel_id DESC', [parcelBy], (err, dbRes) => {
//             if (err) {
//               internalserverError.description = 'Could not retrieve parcel';
//               res.status(500).send(internalserverError);
//             } else {
//               const dataBase = { entries: dbRes.rows, size: dbRes.rows.length };
//               notFound.description = 'Parcel Entry Not Inserted';
//               if (dbRes.rows === undefined) {
//                 res.status(404).send(notFound);
//               } else {
//                 const createReply = { status: '201', message: 'Entry Created successfully', data: dataBase };
//                 res.status(201).send(createReply);
//               }
//             }
//           });
//         }
//       });
//   }
// };

// export {
//    createParcel,
//   };


import moment from 'moment';

import dbQuery from '../db/dbquery';

import { isEmpty } from '../helpers';

const badRequest = { status: '400', message: 'Bad Request' };
const notFound = { status: '404', message: 'Not Found' };
const noContent = { status: '204', message: 'No Content' };
const conflictExists = { status: '409', message: 'Conflict' };

/**
   * Create A Parcel Delivery Order
   * @param {object} req
   * @param {object} res
   * @returns {object} Parcel object
   */

const createParcel = async (req, res) => {
  const {
    parcelname, weight, weightmetric, fromaddress, toaddress,
  } = req.body;
  const sentOn = moment(new Date());
  // eslint-disable-next-line camelcase
  const { user_id } = req.user;
  if (isEmpty(parcelname) || isEmpty(weight) || isEmpty(weightmetric) || isEmpty(fromaddress) || isEmpty(toaddress)) {
    badRequest.description = 'All starred field must be filled up';
    res.status(400).send(badRequest);
  }
  const createParcelQuery = `INSERT INTO
      parcels ( placedby, parcelname, weight, weightmetric, senton, fromaddress, toaddress)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      returning *`;
  const values = [
  // eslint-disable-next-line camelcase
    user_id,
    parcelname,
    weight,
    weightmetric,
    sentOn,
    fromaddress,
    toaddress,
  ];

  try {
    const { rows } = await dbQuery.query(createParcelQuery, values);
    const dbResponse = rows[0];
    const parcelId = dbResponse.parcel_id;
    const createParcelReply = { status: '201', data: [] };
    const message = 'Order Created';
    createParcelReply.data.push({
      parcelId,
      message,
    });
    return res.status(201).send(createParcelReply);
  } catch (error) {
    return res.status(400).send(error);
  }
};

/**
   * Get All Parcel Order
   * @param {object} req 
   * @param {object} res 
   * @returns {object} Parcel array
   */
const getAllParcelOrders = async (req, res) => {
  const getAllParcelOrdersQuery = 'SELECT * FROM parcels ORDER BY parcel_id ASC';
  try {
    const { rows } = await dbQuery.query(getAllParcelOrdersQuery);
    const dbResponse = rows;
    return res.status(200).send(dbResponse);
  } catch (error) {
    console.log(error);
    badRequest.description = 'No Parcel Order';
    return res.status(400).send(error);
  }
};

export {
  createParcel,
  getAllParcelOrders,
}