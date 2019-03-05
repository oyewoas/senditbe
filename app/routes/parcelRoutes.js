import express from 'express';

import { 
  createParcel,
  getAllParcelOrders,
  getAparcel,
  getAllParcelforUser,
  cancelParcelOrder,
  updateParcelDestination,
} from '../controller/parcelsController';
import verifyAuth from '../middlewares/verifyAuth';



export default function route(app) {
  // const badRequest = { status: 400, message: 'Bad Request' };
    // Get Request for a single Parcel
    app.get('/parcels/:id', verifyAuth, getAparcel)
    // Delete Request to delete A parcel
    app.patch('/parcels/:id/cancel', verifyAuth, cancelParcelOrder)
    // Change parcel destination
    app.patch('/parcels/:id/destination', verifyAuth, updateParcelDestination);
  
  // Get request for all Parcels order by a user 
    app.get('/users/parcels', verifyAuth, getAllParcelforUser);

  // Post Request for a parcel entry
    app.post('/parcels',verifyAuth, createParcel);

  // Fetch all parcel delivery orders
  // app.get('/api/v1/parcels', getAllParcelOrders);

}

