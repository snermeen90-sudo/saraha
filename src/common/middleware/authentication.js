import jwt from "jsonwebtoken";
import userModel from "../../DB/models/user.model.js";
import * as dbService from "../../DB/db.service.js"; 

export const Authentication = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        
        if (!authorization) {
            return res.status(401).json({ message: "token is required" });
        }

        // فك التوكن والتحقق منه
        const verification = jwt.verify(authorization, "password123");
        
        if (!verification?.id) {
            return res.status(401).json({ message: "invalid token" });
        }

        const user = await dbService.findOne({
            model: userModel,
            filter: {
                email: verification.email.toLowerCase(),
                provider: "system"
            }
        });

        if (!user) {
            return res.status(404).json({ message: "email does not exist" });
        }

        req.user = user; 
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message, stack: error.stack });
    }
}