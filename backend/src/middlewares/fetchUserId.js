import jwt from "jsonwebtoken";
const JWT_SECRET_KEY = "AcknowledgeYourTribelCheif";

const fetchUserId = (req,res,next)=>{
    const token = req.header('authToken');

    if(token == null)
        return res.status(401).json({"error":"Please authenticate using valid token.","success":false});
    try{
        const data = jwt.verify(token, JWT_SECRET_KEY);

        req.user = data.user;

        next();
        
    }catch(error){
        return res.status(500).json({"error":"Internal Server Error.","success":false});
    }
}

export default fetchUserId;