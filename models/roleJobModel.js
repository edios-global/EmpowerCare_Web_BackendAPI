import {  DataTypes } from 'sequelize';
import { sequelize } from '../dbConfig/dbConfig.js';
import { v4 as uuidv4 } from 'uuid';



const MenuOption = sequelize.define('menu_options', {
    ID: {
        type: DataTypes.UUID,
    defaultValue: uuidv4, // Automatically generate a UUID for new records
    primaryKey: true, Set 
    },
    MENU_NAME: DataTypes.STRING,
    USER_TYPE: DataTypes.STRING,
    SCREEN_NAME:DataTypes.STRING,
    RECORD_TYPE:{
        type: DataTypes.STRING,
    defaultValue: 'I', // Automatically generate a UUID for new records

    },
    CREATED_BY: DataTypes.STRING,
    CREATED_DATE: {
        type: DataTypes.DATE,
    defaultValue: new Date(), // Automatically generate a UUID for new records
    
    },
    LAST_MODIFIED_BY: DataTypes.STRING,
    LAST_MODIFIED_DATE:   {
        type: DataTypes.DATE,
    defaultValue: new Date(), // Automatically generate a UUID for new records
    
    },
    

});

(async () => {
    await sequelize.sync();
    // Code here
})();

export default MenuOption