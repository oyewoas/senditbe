import { 
  createParcel,
  getAllParcelOrders,
  getAparcel,
  getAllParcelforUser,
  cancelParcelOrder,
} from '../controller/parcelsController';
import verifyAuth from '../middlewares/verifyAuth';

export default function route(app) {
  // const badRequest = { status: 400, message: 'Bad Request' };

  // Get Request for a single Parcel
  app.get('/api/v1/parcels/:id', verifyAuth, getAparcel);


  // // Get request for all Parcels order by a user
  app.get('/api/v1/users/parcels', verifyAuth, getAllParcelforUser);


  // // Post Request for a parcel entry
  app.post('/api/v1/parcels', verifyAuth, createParcel);

  // Fetch all parcel delivery orders
  app.get('/api/v1/parcels', getAllParcelOrders);



  // // Put Request to modify the content of an entryRoutes
  // app.put('/api/v1/entries/:id', checkAuth, updateEntry);


  // Delete Request to delete A parcel
  app.delete('/api/v1/parcels/:id', verifyAuth, cancelParcelOrder);
}
