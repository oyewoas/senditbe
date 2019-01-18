// // Nothing is using this yet
// import pool from './pool';


// const createTables = () => {
//   pool.query('CREATE TABLE IF NOT EXISTS users(user_id SERIAL PRIMARY KEY, firstname VARCHAR(100), lastname VARCHAR(100), othernames VARCHAR(100), email VARCHAR(100) UNIQUE NOT NULL, username VARCHAR(50) NOT NULL, registered DATE NOT NULL, isAdmin BOOL DEFAULT(false))',
//     () => {

//     });
//   pool.query('CREATE TABLE IF NOT EXISTS parcels(parcel_id SERIAL PRIMARY KEY, placedBy INTEGER REFERENCES users(user_id), parcelName VARCHAR(300) NOT NULL, weight float NOT NULL, weightmetric VARCHAR(50) NOT NULL, sentOn DATE NOT NULL, deliveredOn DATE, status VARCHAR(50), fromAddress VARCHAR(500) NOT NULL, toAddress VARCHAR(500) NOT NULL, currentLocation VARCHAR(500) )',
//     () => {
//     });
// };

// export default createTables;
