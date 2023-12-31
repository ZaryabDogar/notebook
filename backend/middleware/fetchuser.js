const jwt = require('jsonwebtoken');
const JWT_SECRET='DOGAR DI YARI TE SHEER DI SWARI'

const fetchuser=(req,res,next)=>{
    // get the user from jwt token
    const token=req.header('auth-token')
    if(!token){
        
        res.status(401).send({error:'please authenticarte using a valid token'});
    }
    try {
        const data =jwt.verify(token,JWT_SECRET);
        
        req.user=data.user;
        
next()
    } catch (error) {
        console.error(error.message)
        res.status(401).send({error:'please authenticarte using a valid token'});
    }
 
}
module.exports=fetchuser