import Joi from "joi";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../../models/userModel.js";
import Client from "../../models/clientModel.js";
import { JWT_SECRET } from "../../config/config.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";
import { Op } from "sequelize";

export default {
    validator: validator({
        body: Joi.object({
            login: Joi.string().required(),
            password: Joi.string().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { login, password } = req.body;

            // Find user by email or username
            const user = await User.findOne({
                where: {
                    [Op.or]: [
                        { email: login },
                        { username: login }
                    ]
                }
            });

            // If user not found, try finding client
            if (!user) {
                const client = await Client.findOne({
                    where: {
                        [Op.or]: [
                            { email: login },
                            { username: login }
                        ]
                    }
                });

                if (!client) {
                    return responseHandler.error(res, "User not found");
                }

                // Check if the password is correct for client
                const isPasswordCorrect = await bcrypt.compare(password, client.password);

                if (!isPasswordCorrect) {
                    return responseHandler.error(res, "Invalid client password");
                }

                // Generate JWT token for client
                const token = jwt.sign(
                    { clientId: client.id, email: client.email, role: 'client' },
                    JWT_SECRET,
                    { expiresIn: '24h' }
                );

                return responseHandler.success(res, "Login successful", { token, client });
            }

            // Check if the password is correct for user
            const isPasswordCorrect = await bcrypt.compare(password, user.password);

            if (!isPasswordCorrect) {
                return responseHandler.error(res, "Invalid user password");
            }

            // Generate JWT token for user
            const token = jwt.sign(
                { userId: user.id, email: user.email, role_id: user.role_id },
                JWT_SECRET,
                { expiresIn: '24h' }
            );

            return responseHandler.success(res, "Login successful", { token, user });
        } catch (error) {
            return responseHandler.error(res, "An error occurred during login");
        }
    }
}
