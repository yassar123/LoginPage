const moment = require('moment');
const jwt = require('jsonwebtoken');
const users = require("../db/users.json")

const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = users.find(us => us.email === email && us.password === password)
        if(!user){
            return res.status(401).json({message: 'User not found'});
        }
        const iat = (new Date()).getTime();
        const exp = moment().add(24, 'hours').valueOf();
        const cert = req.app.get('privateKey');
        const passphrase = req.app.get('passphrase');
        const token = jwt.sign({
            issue: email,
            exp: exp,
            iat: iat,
        }, {key: cert, passphrase: passphrase}, { algorithm: 'RS256' });
        return res.status(200).json({token});
    }catch(err){
        return res.status(500).json(err);
    }
};

module.exports = {
    login
}