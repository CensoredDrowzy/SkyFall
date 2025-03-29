const jwt = require('jsonwebtoken');
const tokenBlacklist = new Set();

// Token cleanup every hour
setInterval(() => {
    const now = Date.now();
    Array.from(tokenBlacklist).forEach(token => {
        try {
            const decoded = jwt.decode(token);
            if (decoded.exp * 1000 < now) {
                tokenBlacklist.delete(token);
            }
        } catch (e) {
            tokenBlacklist.delete(token);
        }
    });
}, 3600000);

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token || tokenBlacklist.has(token)) {
        return res.sendStatus(401);
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        tokenBlacklist.add(token);
        return res.sendStatus(403);
    }
};

const secureHeaders = (req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
};

module.exports = {
    verifyToken,
    secureHeaders,
    tokenBlacklist
};