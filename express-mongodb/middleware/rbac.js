export const roles = {
    admin: ['read:any', 'write:any'],
    // user: ['read:any']
    // user: ['read:own']  //- sus recursos solamente
    user: ['read:own', 'write:own'],
  };