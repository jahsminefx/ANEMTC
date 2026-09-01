const { verifyToken } = require('../utils/security');
const store = require('../utils/dbStore');

/**
 * Express Middleware to Protect Admin Routes
 */
async function authenticateAdmin(req, res, next) {
  try {
    let token = null;

    if (req.cookies && req.cookies.admin_token) {
      token = req.cookies.admin_token;
    } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ success: false, error: 'Authentication required. Please log in as admin.' });
    }

    const decoded = verifyToken(token);
    if (!decoded || !decoded.id) {
      return res.status(401).json({ success: false, error: 'Invalid or expired session. Please log in again.' });
    }

    const admin = store.adminUsers.find(u => u.id === decoded.id || u.email === decoded.email);

    if (!admin) {
      return res.status(401).json({ success: false, error: 'Admin account not found or deactivated.' });
    }

    req.admin = { id: admin.id, email: admin.email, name: admin.name, role: admin.role };
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({ success: false, error: 'Authentication processing failed.' });
  }
}

function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.admin || !allowedRoles.includes(req.admin.role)) {
      return res.status(403).json({ success: false, error: 'Access denied. Insufficient privileges.' });
    }
    next();
  };
}

module.exports = {
  authenticateAdmin,
  requireRole
};
