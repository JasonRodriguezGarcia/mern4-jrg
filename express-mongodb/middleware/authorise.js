import { roles } from './rbac.js';

export function authorise(permission,) {
  return (req, res, next) => {
    const userRole = req.role;
    // Check if role exists and has the permission
    if (roles[userRole] && roles[userRole].includes(permission)) {
      return next(); // allowed
    }

    return res.status(403).json({ message: 'Forbidden: insufficient permissions' });
  };
}

// comporar: 
export function authoriseOwnership() {
    return (req, res, next) => {

        if (req.userId == req.params.id)
            return next()
        
        return res.status(403).json({ message: 'Forbidden: No eres el usuario del ID' });
    } 
}
