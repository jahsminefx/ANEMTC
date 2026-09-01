const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET || 'aninta_super_secret_jwt_key_2026!';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

/**
 * Generate JWT Token for Admin User
 */
function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

/**
 * Verify JWT Token
 */
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

/**
 * Hash Plain Text Password
 */
async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

/**
 * Compare Password with Hash
 */
async function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);
}

/**
 * Convert string to URL-friendly slug
 */
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

/**
 * Log Admin Action to AuditLog table
 */
async function recordAuditLog(prisma, { adminId, action, targetType, targetId, details, req }) {
  try {
    const ipAddress = req ? (req.headers['x-forwarded-for'] || req.socket.remoteAddress) : null;
    const userAgent = req ? req.headers['user-agent'] : null;

    await prisma.auditLog.create({
      data: {
        adminId: adminId || null,
        action,
        targetType,
        targetId: targetId ? String(targetId) : null,
        details: typeof details === 'object' ? JSON.stringify(details) : details,
        ipAddress: String(ipAddress || ''),
        userAgent: String(userAgent || '')
      }
    });
  } catch (err) {
    console.error('AuditLog error:', err.message);
  }
}

module.exports = {
  generateToken,
  verifyToken,
  hashPassword,
  comparePassword,
  slugify,
  recordAuditLog
};
