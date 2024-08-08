

import { DataTypes } from 'sequelize';
import { sequelize } from '../dbConfig/dbConfig.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

// const SECRET_KEY = crypto.randomBytes(32);
// const SECRET_KEY = Buffer.from(process.env.SECRET_KEY, 'hex');
// const IV_LENGTH = 16;

// function encryptOTP(otp) {
//   const iv = crypto.randomBytes(IV_LENGTH);
//   const cipher = crypto.createCipheriv('aes-256-cbc', SECRET_KEY, iv);
//   let encrypted = cipher.update(otp, 'utf8', 'hex');
//   encrypted += cipher.final('hex');
//   return iv.toString('hex') + ':' + encrypted;
// }

// function decryptOTP(encryptedOtp) {
//   const [ivHex, encryptedText] = encryptedOtp.split(':');
//   const iv = Buffer.from(ivHex, 'hex');
//   const decipher = crypto.createDecipheriv('aes-256-cbc', SECRET_KEY, iv);
//   let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
//   decrypted += decipher.final('utf8');
//   return decrypted;
// }

const User = sequelize.define('Users', {
  ID: {
    type: DataTypes.UUID,
    defaultValue: uuidv4,
    primaryKey: true,
  },
  FIRST_NAME: DataTypes.STRING,
  LAST_NAME: DataTypes.STRING,
  USER_STATUS: DataTypes.STRING,
  EMAIL_ADDRESS: DataTypes.STRING,
  PHONE_NUMBER: DataTypes.STRING,
  MOBILE_OTP: DataTypes.STRING,
  PROFILE_STATUS: DataTypes.STRING,
  USER_TYPE: DataTypes.STRING,
  PASSWORD: DataTypes.STRING,
  // SPECAILITY_ID: {
  //   type: DataTypes.INTEGER,
  //   allowNull: true, // Set to true if you want the field to be optional
  // },
  // JOBROLE_ID: {
  //   type: DataTypes.INTEGER,
  //   allowNull: true, // Set to true if you want the field to be optional
  // },
  JOBROLE_NAME: {
    type: DataTypes.STRING,
  },
  SPECIALTY_LIST: {
    type: DataTypes.JSON,
  },
  LICENSE_STATE: DataTypes.STRING,
  LICENSE_NUMBER: DataTypes.STRING,
  LICENSE_TYPE: DataTypes.STRING,
  LICENSE_ISSUE_DATE: {
    type: DataTypes.DATE,
  },
  LICENSE_EXPIRE_DATE: {
    type: DataTypes.DATE,
  },
  PREFERRED_AREA_OF_WORK: {
    type: DataTypes.JSON,
  },
  PREFERRED_WORK_TYPE: {
    type: DataTypes.JSON,
  },

  EXP_SPECIALTY_LIST: {
    type: DataTypes.JSON,
  },
  EXP_JOBROLE_NAME: DataTypes.STRING,
  EXP_FACILITY_NAME: DataTypes.STRING,
  EXP_FROM_DATE: {
    type: DataTypes.DATE,
  },
  EXP_TO_DATE: {
    type: DataTypes.DATE,
  },
  REFERENCE_FIRST_NAME: DataTypes.STRING,
  REFERENCE_LAST_NAME: DataTypes.STRING,
  REFERENCE_EMAIL_ADDRESS: DataTypes.STRING,
  REFERENCE_FACILITY_NAME: DataTypes.STRING,
  REFERENCE_WORKING_FROM_DATE: {
    type: DataTypes.DATE,
  },
  REFERENCE_WORKING_TO_DATE: {
    type: DataTypes.DATE,
  },
  REFERENCE_CONTRACT: DataTypes.STRING,
  REFERENCE_CONSENT: DataTypes.BOOLEAN,
  STREET_ADDRESS: DataTypes.STRING,
  LONGITUDE: DataTypes.STRING,
  LATITUDE: DataTypes.STRING,
  CITY: DataTypes.STRING,
  STATE: DataTypes.STRING,
  ZIPCODE: DataTypes.STRING,
  CHILD_USER_ID: {
    type: DataTypes.INTEGER,
    // allowNull: true, // Set to true if you want the field to be optional
  },
  ROLE_ID: {
    type: DataTypes.INTEGER,
    //   allowNull: true, // Set to true if you want the field to be optional
  },
  RECORD_TYPE: {
    type: DataTypes.STRING,
    defaultValue: 'I',
  },
  CREATED_BY: DataTypes.STRING,
  CREATED_DATE: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  LAST_MODIFIED_BY: DataTypes.STRING,
  LAST_MODIFIED_DATE: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
},
  // {
  //   hooks: {
  //     beforeCreate: async (user, options) => {
  //       if (user.PASSWORD) {
  //         const saltRounds = 10;
  //         user.PASSWORD = await bcrypt.hash(user.PASSWORD, saltRounds);
  //       }

  //       if (user.MOBILE_OTP) {
  //         user.MOBILE_OTP = encryptOTP(user.MOBILE_OTP);
  //       }
  //     },
  //     beforeUpdate: async (user, options) => {
  //       if (user.MOBILE_OTP) {
  //         user.MOBILE_OTP = encryptOTP(user.MOBILE_OTP);
  //       }
  //     },
  //     afterFind: (results) => {
  //       if (Array.isArray(results)) {
  //         results.forEach(user => {
  //           if (user.MOBILE_OTP) {
  //             user.MOBILE_OTP = decryptOTP(user.MOBILE_OTP);
  //           }
  //         });
  //       } else if (results?.MOBILE_OTP) {
  //         results.MOBILE_OTP = decryptOTP(results.MOBILE_OTP);
  //       }
  //     },
  //   },
  // }
);

// User.prototype.comparePassword = async function (plainPassword) {
//   return await bcrypt.compare(plainPassword, this.PASSWORD);
// };

// export async function authenticateUser(email, plainPassword) {
//   try {
//     const user = await User.findOne({ where: { EMAIL_ADDRESS: email } });
//     if (user && await user.comparePassword(plainPassword)) {
//       console.log('Authentication successful');
//       return user;
//     } else {
//       console.log('Authentication failed');
//       return null;
//     }
//   } catch (error) {
//     console.error('Error authenticating user:', error);
//     throw error;
//   }
// }

(async () => {
  await sequelize.sync();
})();

export default User;
