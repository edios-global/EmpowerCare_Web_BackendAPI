import asyncHandler from 'express-async-handler'
import User from "../models/userModel.js";
import { generateOtp } from '../generic/genericMethods.js';

export const validateUserEmail = asyncHandler(async (req, res) => {
    try {
        const { EMAIL_ADDRESS } = req.body;
        if (!EMAIL_ADDRESS) {
            return res.status(202).json({ STATUS: false, MESSAGE: "PARAMETER_MISSING", OUTPUT: [] });
        }
        console.log("EMAIL_ADDRESS", EMAIL_ADDRESS);

        const user = await User.findOne({ where: { EMAIL_ADDRESS } });

        if (user) {
            return res.status(200).json({ STATUS: true, MESSAGE: "ALREADY_EXIST", OUTPUT: [] });
        }

        return res.status(200).json({ STATUS: false, MESSAGE: "NOT_EXIST", OUTPUT: [] });
    } catch (error) {
        return res.status(500).json({ STATUS: false, MESSAGE: error.message, OUTPUT: [] });
    }
});
export const addUser = asyncHandler(async (req, res) => {
    try {
        const userData = req.body;
        if (!userData.FIRST_NAME || !userData.EMAIL_ADDRESS || !userData.PASSWORD || !userData.PHONE_NUMBER || !userData.USER_STATUS) {
            return res.status(202).json({ STATUS: false, MESSAGE: 'Required fields are missing', OUTPUT: [] });
        }

        if (userData.USER_STATUS === "New") {
            const user = await User.findOne({ where: { PHONE_NUMBER: userData.PHONE_NUMBER } });

            if (user) {
                return res.status(202).json({ STATUS: false, MESSAGE: "Mobile Number already exist", OUTPUT: [] });
            }


            const otp = await generateOtp();
            userData.MOBILE_OTP = otp;
            const insertUser = await User.create(userData);
            console.log("insertUser", insertUser);
            if (insertUser.ID !== null) {
                return res.status(200).json({ STATUS: true, MESSAGE: "USER INSERT SUCCESSFUL", OUTPUT: { USER_ID: insertUser.ID } });
            } else {
                return res.status(201).json({ STATUS: false, MESSAGE: "USER NOT INSERT", OUTPUT: [] })
            }
        }


    } catch (error) {
        console.log("addUser error", error);
        return res.status(500).json({ STATUS: false, MESSAGE: error.message, OUTPUT: [] });
    }

});

export const OTPVerification = asyncHandler(async (req, res) => {
    try {
        const { USER_ID, OTP } = req.body;
        console.log("USER_ID, OTP", USER_ID, OTP);

        if (!USER_ID || !OTP) {
            return res.status(202).json({ STATUS: false, MESSAGE: "PARAMETER_MISSING", OUTPUT: [] });
        }

        const user = await User.findOne({ where: { ID: USER_ID, MOBILE_OTP: OTP } });
        if (user) {
            return res.status(200).json({ STATUS: true, MESSAGE: "Verification Code matched successful", OUTPUT: [] });
        } else {
            return res.status(201).json({ STATUS: false, MESSAGE: "Verification Code not matched", OUTPUT: [] });
        }
    } catch (error) {
        console.log("OTPVerification error: ", error);

        return res.status(500).json({ STATUS: false, MESSAGE: error.message, OUTPUT: [] });
    }
});




