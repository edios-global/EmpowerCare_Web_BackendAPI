import asyncHandler from 'express-async-handler'
import User from "../models/userModel.js";
import { encryptPassword, generateOtp, generateTempPassword } from '../generic/genericMethods.js';
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

        const { USER_ID, JOBROLE_NAME, SPECIALTY_LIST, LICENSE_STATE, LICENSE_NUMBER, LICENSE_TYPE, LICENSE_ISSUE_DATE, LICENSE_EXPIRE_DATE, FILE, FILE_NAME, PREFERRED_AREA_OF_WORK, PREFERRED_WORK_TYPE, EXP_JOBROLE_NAME, EXP_SPECIALTY_LIST, EXP_FACILITY_NAME, EXP_FROM_DATE, EXP_TO_DATE, REFERENCE_FIRST_NAME, REFERENCE_LAST_NAME, REFERENCE_EMAIL_ADDRESS, REFERENCE_FACILITY_NAME, REFERENCE_WORKING_FROM_DATE, REFERENCE_WORKING_TO_DATE, REFERENCE_CONSENT, STREET_ADDRESS, ADDRESS_COMPONENTS, LONGITUDE, LATITUDE, CHILD_USER_ID, ROLE_ID } = req.body;
        console.log("Request Body:", req.body);

        if (!USER_ID) {
            return res.status(202).json({ STATUS: false, MESSAGE: "PARAMETER_MISSING", OUTPUT: [] });
        }
        const user = await User.findOne({ where: { ID: USER_ID } });

        console.log("User Data:", user);
        if (!user) {
            console.log("User not found");
            return res.status(404).json({ STATUS: false, MESSAGE: "User not found", OUTPUT: [] });
        }

        const updateData = {
            FILE_NAME,
            JOBROLE_NAME,
            LICENSE_STATE,
            LICENSE_TYPE,
            LICENSE_NUMBER,
            LICENSE_ISSUE_DATE,
            LICENSE_EXPIRE_DATE,
            SPECIALTY_LIST: JSON.stringify(SPECIALTY_LIST),  // Store as JSON if the column type is TEXT or JSON
            PREFERRED_AREA_OF_WORK: JSON.stringify(PREFERRED_AREA_OF_WORK),
            PREFERRED_WORK_TYPE: JSON.stringify(PREFERRED_WORK_TYPE),
            EXP_JOBROLE_NAME: EXP_JOBROLE_NAME || '',
            EXP_FACILITY_NAME: EXP_FACILITY_NAME || '',
            EXP_FROM_DATE: EXP_FROM_DATE || null,
            EXP_TO_DATE: EXP_TO_DATE || null,
            EXP_SPECIALTY_LIST: EXP_SPECIALTY_LIST || null,
            REFERENCE_FIRST_NAME: REFERENCE_FIRST_NAME || '',
            REFERENCE_LAST_NAME: REFERENCE_LAST_NAME || '',
            REFERENCE_EMAIL_ADDRESS: REFERENCE_EMAIL_ADDRESS || '',
            REFERENCE_FACILITY_NAME: REFERENCE_FACILITY_NAME || '',
            REFERENCE_WORKING_FROM_DATE: REFERENCE_WORKING_FROM_DATE || null,
            REFERENCE_WORKING_TO_DATE: REFERENCE_WORKING_TO_DATE || null,
            REFERENCE_CONSENT: REFERENCE_CONSENT || false,
            STREET_ADDRESS: STREET_ADDRESS || ADDRESS_COMPONENTS.STREET,
            STATE: ADDRESS_COMPONENTS.STATE,
            COUNTRY: ADDRESS_COMPONENTS.COUNTRY,
            ZIPCODE: ADDRESS_COMPONENTS.ZIPCODE,
            CITY: ADDRESS_COMPONENTS.CITY
        };
        const updated = await User.update(updateData, {
            where: { ID: USER_ID },
            returning: true
        });
        console.log("updated==>", updated)

        if (updated) {
            const updatedUser = await User.findOne({ where: { ID: USER_ID } });
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

        const user = await User.findOne({ where: { ID: 'fbffe962-9426-4ca6-ae2e-fcf8081cf6f2', EMAIL_ADDRESS } })
        if (!user) {
            return res.status(404).json({ STATUS: false, MESSAGE: "user not Found", OUTPUT: [] })
        }

        const tempPassword = await generateTempPassword();
        console.log("tempPassword", tempPassword);
        const encryptedPassword = await encryptPassword(tempPassword);

        const updateUser = await User.update(
            {
                PASSWORD: encryptedPassword,
                USER_STATUS: "Active",
                RECORD_TYPE: "U",
                LAST_MODIFIED_DATE: new Date(),
            },
            {
                where: { id: 'fbffe962-9426-4ca6-ae2e-fcf8081cf6f2' },
            }
        );
        if (updateUser) {
            return res.status(404).json({ STATUS: false, MESSAGE: "Password reset succesfully ", OUTPUT: updateUser })
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
        if (OTP === "123456") {
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

