import { createAdmin, loginAdmin, deleteAdmin, getAdminProfile, updateAdminProfile, getAllAdmin, 
     
  } from '../controller/adminController';
  import verifyAdmin from '../middlewares/verifyAdmin';
  
  export default function route(app) {
    app.post('/api/v1/admin/signup', createAdmin);
  
    app.post('/api/v1/admin/login', loginAdmin);
  
    app.delete('/api/v1/admin/me', verifyAdmin, deleteAdmin);
  
    app.get('/api/v1/admin/profile', verifyAdmin, getAdminProfile);
  
    app.put('/api/v1/admin/profile', verifyAdmin, updateAdminProfile);
  
    app.get('/api/v1/admin', getAllAdmin);
  
  
    
    // app.get('/api/v1/user/profile', verifyAuth, getProfile);
    
    // app.put('/api/v1/user/profile', verifyAuth, updateProfile);
    
    // app.put('/api/v1/user/updatename', checkAuth, updateName);
  }
  