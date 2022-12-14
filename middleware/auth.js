const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    // Get token from the header
    // if we input the correct token into the header of post or get request, then this requset will be authorized
    const token = req.header('x-auth-token'); 

    // Check if no token
    if (!token) {
        return res.status(401).json( { msg: 'No token, authorization denied' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));//decode the token

        req.user = decoded.user;
        next();
    } catch(err) {
        res.status(401).json( {msg: 'Token is not valid'});
    }  
};