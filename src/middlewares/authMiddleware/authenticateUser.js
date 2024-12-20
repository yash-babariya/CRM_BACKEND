import jwt from "jsonwebtoken";
import User from "../../models/userModel.js";
import { JWT_SECRET } from "../../config/config.js";
import responseHandler from "../../utils/responseHandler.js";
import Client from "../../models/clientModel.js";

const authenticateUser = async (req, res, next) => {
    try {
        let token;
        if (req.headers?.authorization?.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return responseHandler.error(res, "Authorization token is required");
        }

        const decoded = jwt.verify(token, JWT_SECRET);


        if (!decoded.userId && !decoded.clientId) {
            return responseHandler.error(res, "Invalid token: userId or clientId not found");
        }

        const user = await User.findByPk(decoded.userId); // Use findByPk for Sequelize models
        const client = await Client.findByPk(decoded.clientId);

        if (!user && !client) {
            return responseHandler.error(res, "User not found");
        }

        req.user = user || client;
        next();
    } catch (error) {
        return responseHandler.error(res, error.message);
    }
};

export default authenticateUser;