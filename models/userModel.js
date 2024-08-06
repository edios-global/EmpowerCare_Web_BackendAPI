import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../dbConfig/dbConfig.js';
import { v4 as uuidv4 } from 'uuid';


const User = sequelize.define('Users', {
  ID: {
    type: DataTypes.UUID,
    defaultValue: uuidv4, // Automatically generate a UUID for new records
    primaryKey: true, Set
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
  // LICENSE_NUMBER: DataTypes.STRING,
  // LICENSE_TYPE: DataTypes.STRING,
  // LICENSE_ISSUE_DATE: {
  //   type: DataTypes.DATE,
  // },
  // LICENSE_EXPIRE_DATE: {
  //   type: DataTypes.DATE,
  // },
  // SPECAILITY_ID: {
  //   type: DataTypes.INTEGER,
  //   allowNull: true, // Set to true if you want the field to be optional
  // },
  // JOBROLE_ID: {
  //   type: DataTypes.INTEGER,
  //   allowNull: true, // Set to true if you want the field to be optional
  // },
  // REFERENCE_FIRST_NAME: DataTypes.STRING,
  // REFERENCE_LAST_NAME: DataTypes.STRING,
  // REFERENCE_EMAIL_ADDRESS: DataTypes.STRING,
  // REFERENCE_FACILITY_NAME: DataTypes.STRING,
  // REFERENCE_WORKING_FROM_DATE: {
  //   type: DataTypes.DATE,
  // },
  // REFERENCE_WORKING_TO_DATE: {
  //   type: DataTypes.DATE,
  // },
  // REFERENCE_CONTRACT: DataTypes.STRING,
  // STREET_ADDRESS: DataTypes.STRING,
  // LONGITUDE: DataTypes.STRING,
  // LATITUDE: DataTypes.STRING,
  // CITY: DataTypes.STRING,
  // STATE: DataTypes.STRING,
  // ZIPCODE: DataTypes.STRING,
  // CHILD_USER_ID: {
  //   type: DataTypes.INTEGER,
  //   allowNull: true, // Set to true if you want the field to be optional
  // },
  // ROLE_ID: {
  //   type: DataTypes.INTEGER,
  //   allowNull: true, // Set to true if you want the field to be optional
  // },
  // PROFILE_STATUS: DataTypes.STRING,
  // PREFFERED_AREA_OF_WORK: DataTypes.STRING,
  // PREFFERED_WORK_TYPE: DataTypes.STRING,

  JOBROLE_NAME: {
    type: DataTypes.STRING,
    // allowNull: false,

  },
  SPECAILITY_LIST: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  RECORD_TYPE: {
    type: DataTypes.STRING,
    defaultValue: 'I', // Automatically generate a UUID for new records

  },
  CREATED_BY: DataTypes.STRING,
  CREATED_DATE: {
    type: DataTypes.DATE,
    defaultValue: new Date(), // Automatically generate a UUID for new records

  },

  LAST_MODIFIED_BY: DataTypes.STRING,
  LAST_MODIFIED_DATE: {
    type: DataTypes.DATE,
    defaultValue: new Date(), // Automatically generate a UUID for new records

  },


});

(async () => {
  await sequelize.sync();

})();

export default User