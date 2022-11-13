const jwt = require('jsonwebtoken');

const authUser = async (req, res, next) => {
    try{
        const token = req.headers['x-access-token'];
        const cert = req.app.get('publicKey');
        jwt.verify(token, cert, {algorithm: ['HS256', 'RS256']}, (error, decoded) => {
            if (error) {
                console.error(error);
                return res.status(400).json(error)
            } 
            if (decoded.exp <= Date.now()) {
                return res.status(403).json('Access token has expired');
            }
            next();
        });
    }catch(err){
        return res.status(500).json(err);
    }
};

module.exports = {
    authUser
}