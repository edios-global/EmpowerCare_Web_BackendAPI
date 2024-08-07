import asyncHandler from 'express-async-handler'
import User from "../models/userModel.js";
import { generateOtp } from '../generic/genericMethods.js';
import States from '../models/stateModel.js';

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


export const addOnboardWizardDetail = asyncHandler(async (req, res) => {
    try {
        const { USER_ID, JOBROLE_NAME, SPECAILITY_LIST } = req.body;
        console.log("Request Body:", req.body);

        if (!USER_ID || !JOBROLE_NAME || !SPECAILITY_LIST) {
            return res.status(202).json({ STATUS: false, MESSAGE: "PARAMETER_MISSING", OUTPUT: [] });
        }
        const user = await User.findOne({ where: { ID: 'fbffe962-9426-4ca6-ae2e-fcf8081cf6f2' } });

        if (!user.toJSON()) {
            console.log("User not found");
            return res.status(404).json({ STATUS: false, MESSAGE: "User not found", OUTPUT: [] });
        }
        console.log("User Data:", user);

        const updateData = {
            JOBROLE_NAME: JOBROLE_NAME || user.JOBROLE_NAME,
            SPECAILITY_LIST: SPECAILITY_LIST || user.SPECAILITY_LIST,
        };
        const updated = await User.update(updateData, {
            where: { ID: 'fbffe962-9426-4ca6-ae2e-fcf8081cf6f2' },
            returning: true
        });
        console.log("updated==>", updated)

        if (updated) {
            const updatedUser = await User.findOne({ where: { ID: 'fbffe962-9426-4ca6-ae2e-fcf8081cf6f2' } });
            return res.status(200).json({ STATUS: true, MESSAGE: "User updated successfully", OUTPUT: updatedUser });
        } else {
            return res.status(400).json({ STATUS: false, MESSAGE: "Update failed", OUTPUT: [] });
        }
    } catch (error) {
        console.log("Error:", error);
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


export const getAllState = asyncHandler(async (req, res) => {
    try {

        const fetchStates = await States.findAll({ attributes: ['ID', 'STATE_NAME'] });
        const statesData = fetchStates.map(state => state.dataValues);

        return res.status(200).json({ STATUS: true, MESSAGE: "Fetched States Successfully", OUTPUT: statesData })
    } catch (error) {
        console.log("GET STATES error: ", error);

        return res.status(404).json({ STATUS: false, MESSAGE: error.message, OUTPUT: [] })
    }
})

