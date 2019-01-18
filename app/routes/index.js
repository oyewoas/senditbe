import parcelRoutes from './parcelRoutes';
import userRoutes from './userRoutes';

const parcelRoute = parcelRoutes;
const userRoute = userRoutes;

export default function router(app) {
  parcelRoute(app);
  userRoute(app);
  // Other route groups could go here, in the future
}
