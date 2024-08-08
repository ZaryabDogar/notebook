const jwt = require('jsonwebtoken');
const JWT_SECRET = 'DOGAR DI YARI TE SHEER DI SWARI';
// "proxy": "https://note-be-two.vercel.app"
const fetchuser = (req, res, next) => {
    // Get the user from jwt token
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ error: 'Please authenticate using a valid token' });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        console.error(error.message);
        return res.status(401).send({ error: 'Please authenticate using a valid token' });
    }
};

module.exports = fetchuser;
