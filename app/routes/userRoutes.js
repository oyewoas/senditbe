import { createUser, loginUser, deleteUser } from '../controller/usersController';

// import verifyAuth from '../middleware/verifyAuth';

export default function route(app) {
  app.post('/api/v1/user/signup', createUser);

  app.post('/api/v1/user/login', loginUser);

  app.delete('/api/v1/users/me', deleteUser);
  
  // app.get('/api/v1/user/profile', verifyAuth, getProfile);
  
  // app.put('/api/v1/user/profile', verifyAuth, updateProfile);
  
  // app.put('/api/v1/user/updatename', checkAuth, updateName);
}
