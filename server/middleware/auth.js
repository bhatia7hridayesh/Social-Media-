import Jwt from "jsonwebtoken";

export const verifytoken = async (req, res, next) => {
    try{
        let token = req.header("Authorization");

        if(!token) {
            res.status(403).send("Access Denied");
        }

        if(token.startsWith("Bearer ")){
            token = token.slice(7, token.length).trimLeft();
        }
    
        const verify = Jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.user = verify;
        next();
    }catch(error){
        res.status(500).json({error:error.message});
    }
}