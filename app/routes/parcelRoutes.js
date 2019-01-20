import { 
  createParcel,
  getAllParcelOrders,
  getAparcel,
} from '../controller/parcelsController';
import verifyAuth from '../middlewares/verifyAuth';

export default function route(app) {
  // const badRequest = { status: 400, message: 'Bad Request' };

  // Get Request for a single Parcel
  app.get('/api/v1/parcels/:id', verifyAuth, getAparcel);


  // // Get request for all entries in the array
  // app.get('/api/v1/entries', checkAuth, getEntries);


  // // Post Request for an entry
  app.post('/api/v1/parcels', verifyAuth, createParcel);

  // Fetch all parcel delivery orders
  app.get('/api/v1/parcels', getAllParcelOrders);



  // // Put Request to modify the content of an entryRoutes
  // app.put('/api/v1/entries/:id', checkAuth, updateEntry);


  // // Delete Request to delete an entry
  // app.delete('/api/v1/entries/:id', checkAuth, deleteEntry);
}
