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
            return res.status(200).json({ STATUS: false, MESSAGE: "ALREADY_EXIST", OUTPUT: [] });
        }

        return res.status(200).json({ STATUS: true, MESSAGE: "NOT_EXIST", OUTPUT: [] });
    } catch (error) {
        console.log("Verify Address Error:", error);

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

        const { USER_ID, JOBROLE_NAME, SPECIALTY_LIST, LICENSE_STATE, LICENSE_NUMBER, LICENSE_TYPE, LICENSE_ISSUE_DATE, LICENSE_EXPIRE_DATE, FILE_NAME, PREFERRED_AREA_OF_WORK, PREFERRED_WORK_TYPE, EXP_JOBROLE_NAME, EXP_SPECIALTY_LIST, EXP_FACILITY_NAME, EXP_FROM_DATE, EXP_TO_DATE, REFERENCE_FIRST_NAME, REFERENCE_LAST_NAME, REFERENCE_EMAIL_ADDRESS, REFERENCE_FACILITY_NAME, REFERENCE_WORKING_FROM_DATE, REFERENCE_WORKING_TO_DATE, REFERENCE_CONSENT, STREET_ADDRESS, LONGITUDE, LATITUDE, CITY, STATE, ZIPCODE, CHILD_USER_ID, ROLE_ID } = req.body;
        console.log("Request Body:", req.body);

        if (!USER_ID || !JOBROLE_NAME || !SPECIALTY_LIST) {
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
            SPECIALTY_LIST: SPECIALTY_LIST || user.SPECIALTY_LIST,
            LICENSE_STATE: LICENSE_STATE || user.LICENSE_STATE,
            LICENSE_NUMBER: LICENSE_NUMBER || user.LICENSE_NUMBER,
            LICENSE_TYPE: LICENSE_TYPE || user.LICENSE_TYPE,
            LICENSE_ISSUE_DATE: LICENSE_ISSUE_DATE || user.LICENSE_ISSUE_DATE,
            LICENSE_EXPIRE_DATE: LICENSE_EXPIRE_DATE || user.LICENSE_EXPIRE_DATE,
            PREFERRED_AREA_OF_WORK: PREFERRED_AREA_OF_WORK || user.PREFERRED_AREA_OF_WORK,
            PREFERRED_WORK_TYPE: PREFERRED_WORK_TYPE || user.PREFERRED_WORK_TYPE,
            EXP_JOBROLE_NAME: EXP_JOBROLE_NAME || user.EXP_JOBROLE_NAME,
            EXP_SPECIALTY_LIST: EXP_SPECIALTY_LIST || user.EXP_SPECIALTY_LIST,
            EXP_FACILITY_NAME: EXP_FACILITY_NAME || user.EXP_FACILITY_NAME,
            EXP_FROM_DATE: EXP_FROM_DATE || user.EXP_FROM_DATE,
            EXP_TO_DATE: EXP_TO_DATE || user.EXP_TO_DATE,
            REFERENCE_FIRST_NAME: REFERENCE_FIRST_NAME || user.REFERENCE_FIRST_NAME,
            REFERENCE_LAST_NAME: REFERENCE_LAST_NAME || user.REFERENCE_LAST_NAME,
            REFERENCE_EMAIL_ADDRESS: REFERENCE_EMAIL_ADDRESS || user.REFERENCE_EMAIL_ADDRESS,
            REFERENCE_FACILITY_NAME: REFERENCE_FACILITY_NAME || user.REFERENCE_FACILITY_NAME,
            REFERENCE_WORKING_FROM_DATE: REFERENCE_WORKING_FROM_DATE || user.REFERENCE_WORKING_FROM_DATE,
            REFERENCE_WORKING_TO_DATE: REFERENCE_WORKING_TO_DATE || user.REFERENCE_WORKING_TO_DATE,
            REFERENCE_CONTRACT: REFERENCE_CONTRACT || user.REFERENCE_CONTRACT,
            REFERENCE_CONSENT: REFERENCE_CONSENT || user.REFERENCE_CONSENT,
            STREET_ADDRESS: STREET_ADDRESS || user.STREET_ADDRESS,
            LONGITUDE: LONGITUDE || user.LONGITUDE,
            LATITUDE: LATITUDE || user.LATITUDE,
            CITY: CITY || user.CITY,
            STATE: STATE || user.STATE,
            ZIPCODE: ZIPCODE || user.ZIPCODE,
            CHILD_USER_ID: CHILD_USER_ID || user.CHILD_USER_ID,
            ROLE_ID: ROLE_ID || user.ROLE_ID
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


export const forgotPassword = asyncHandler(async (req, res) => {
    try {
        const { EMAIL_ADDRESS } = req.body;

        if (!EMAIL_ADDRESS) {
            return res.status(202).json({ STATUS: false, MESSAGE: "PARAMETER_MISSING", OUTPUT: [] });
        }

        const user = await User.findOne({ where: { ID: '5c99d802-b3fa-43e4-ad07-74714ecd86e4', EMAIL_ADDRESS } })
        if (!user) {
            return res.status(404).json({ STATUS: false, MESSAGE: "user not Found", OUTPUT: [] })
        }

        const otp = await generateOtp();
        console.log("otp", otp)
        const updateUser = await User.update(
            {
                MOBILE_OTP: otp,
            },
            {
                where: { id: '5c99d802-b3fa-43e4-ad07-74714ecd86e4' },
            }
        );
        if (updateUser) {
            return res.status(404).json({ STATUS: true, MESSAGE: "Password reset succesfully ", OUTPUT: updateUser })
        }

    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({ STATUS: false, MESSAGE: error.message, OUTPUT: [] });
    }
});

export const verifyOTP = asyncHandler(async (req, res) => {
    try {
        let { USER_ID, OTP } = req.body;

        USER_ID = '5c99d802-b3fa-43e4-ad07-74714ecd86e4';
        console.log("Received data:", USER_ID);


        if (!USER_ID || !OTP) {
            return res.status(202).json({ STATUS: false, MESSAGE: "PARAMETER_MISSING", OUTPUT: [] });
        }

        const user = await User.findOne({ where: { ID: USER_ID, MOBILE_OTP: OTP } });
        console.log("user", user)
        if (user) {
            // OTP is correct
            console.log("OTP matched successfully");
        } else {
            // OTP is incorrect
            console.log("Invalid OTP or User ID");
        }
        if (!user) {
            return res.status(400).json({ STATUS: false, MESSAGE: "Invalid OTP", OUTPUT: [] });
        }
        return res.status(200).json({ STATUS: true, MESSAGE: "OTP verified successfully", OUTPUT: [] });

    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({ STATUS: false, MESSAGE: error.message, OUTPUT: [] });
    }
});

export const changePassword = asyncHandler(async (req, res) => {
    try {
        let { USER_ID, PASSWORD } = req.body;

        USER_ID = '5c99d802-b3fa-43e4-ad07-74714ecd86e4';
        console.log("Received data:", USER_ID);

        if (!USER_ID || !PASSWORD) {
            return res.status(400).json({ STATUS: false, MESSAGE: 'PARAMETER_MISSING', OUTPUT: [] });
        }

        const user = await User.findOne({ where: { ID: USER_ID } });
        if (!user) {
            return res.status(404).json({ STATUS: false, MESSAGE: 'User not found', OUTPUT: [] });
        }

        // user.PASSWORD = hashedPassword;
        const updateData = {
            PASSWORD: PASSWORD || user.PASSWORD,
        };
        const updated = await User.update(updateData, {
            where: { ID: USER_ID },
            returning: true
        });
        console.log("updated==>", updated)
        if (updated) {
            const updatedUser = await User.findOne({ where: { ID: USER_ID, } });
            console.log("updated==>", updatedUser)
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

        // const user = await User.findOne({ where: { ID: USER_ID, MOBILE_OTP: OTP } });
        // if (user) {
        if (OTP === "432947") {
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

