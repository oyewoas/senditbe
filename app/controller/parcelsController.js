
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

  