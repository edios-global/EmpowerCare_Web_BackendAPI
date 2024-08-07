
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const otpGenerator = require('otp-generator')
var CryptoJS = require("crypto-js");
const crypto = require('crypto');

// Function to generate a 6-digit OTP
export const generateOtpDigits = async () => {
    return new Promise((resolve) => {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        resolve(otp);
    });
};

export async function generateTempPassword() {
    try {
        return new Promise(resolve => {
            const password = otpGenerator.generate(8, { digits: true, lowerCaseAlphabets: true, upperCaseAlphabets: true, specialChars: true })
            resolve(password);
        });
    } catch (error) {
        console.log("Catch in generatePassword==", error);
    }
};

export async function encryptPassword(password) {
    try {
        var iv = CryptoJS.enc.Hex.parse("");
        const key = CryptoJS.enc.Hex.parse(process.env.ENCRYPTION_SEED_KEY);
        var encryptedPassword = CryptoJS.AES.encrypt(password, key, { iv: iv }).toString();
        return encryptedPassword;
    } catch (error) {
        console.log("Catch in encryptPassword==", error);
    }
};

export const encryptOtp = async (otp) => {
    return new Promise((resolve, reject) => {
        try {
            const secretKey = Buffer.from('EMPOWERCARE', 'utf8'); // Decode secret key from environment
            if (secretKey.length !== 32) { // Ensure key length is correct (32 bytes for AES-256)
                throw new Error('Invalid secret key length');
            }

            const iv = crypto.randomBytes(16); // Generate a secure random IV
            const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, iv);
            let encrypted = cipher.update(otp, 'utf8', 'hex');
            encrypted += cipher.final('hex');
            // Return both IV and encrypted data
            resolve({ iv: iv.toString('hex'), encryptedData: encrypted });
        } catch (error) {
            reject(new Error('Encryption failed: ' + error.message));
        }
    });
};

export async function generateOtp() {
    try {
        return new Promise(resolve => {
            const otp = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
            resolve(otp);
        });
    } catch (error) {
        console.log("Catch in generateOtp==", error);
    }
};

export async function generatePassword() {
    try {
        return new Promise(resolve => {
            const password = otpGenerator.generate(6, { digits: true, lowerCaseAlphabets: true, upperCaseAlphabets: true, specialChars: true })
            resolve(password);
        });
    } catch (error) {
        console.log("Catch in generatePassword==", error);
    }
};



export async function decryptPassword(password) {
    try {
        var iv = CryptoJS.enc.Hex.parse("");
        const key = CryptoJS.enc.Hex.parse(process.env.ENCRYPTION_SEED_KEY);
        var decryptedPassword = CryptoJS.AES.decrypt(password, key, { iv: iv }).toString(CryptoJS.enc.Utf8);
        return decryptedPassword;
    } catch (error) {
        console.log("Catch in decryptPassword==", error);
    }
};
export async function templateFilter(name, templateArray) {
    return new Promise(async resolve => {
        let result = "None";
        let template = [];
        try {

            template = templateArray.filter(template => template.templateName === name);
            console.log("bjasdhbaj", template)
            if (template.length > 0) {
                if (template[0].templateType === "Email") {
                    let emailvalues = {
                        templateSubject: template[0].templateSubject,
                        templateMessage: template[0].templateMessage
                    }
                    result = emailvalues;
                } else {
                    result = template[0].templateMessage
                }

            }
            resolve(result);

        } catch (error) {
            console.log("Catch in getSesstionDataByID==", error);
            resolve(result);
        }
    });
};
export async function parameterfilter(code, parameterArray) {
    return new Promise(async resolve => {
        let result = "None";
        let parameter = [];
        try {
            parameter = parameterArray.filter(parameter => parameter.parameterCode === code);
            if (parameter.length > 0) {
                result = parameter[0].parameterValue;
            }
            resolve(result);

        } catch (error) {
            console.log("Catch in getSesstionDataByID==", error);
            resolve(result);
        }
    });
};





