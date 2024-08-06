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