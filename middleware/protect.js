const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if(!authHeader) {
        const err = new Error('Not authenticated');
        err.statusCode = 401;
        throw err;
    }
    const token = authHeader.split('Bearer_')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'superpupersecretword');
    } catch (e) {
        e.statusCode = 500;
        throw e;
    }
    if(!decodedToken) {
        const err = new Error('Not authenticated');
        err.statusCode = 401;
        throw err;
    }
    req.userId = decodedToken.userId;
    next();
};
