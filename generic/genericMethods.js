
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const otpGenerator = require('otp-generator')

var CryptoJS = require("crypto-js");


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


  

    



