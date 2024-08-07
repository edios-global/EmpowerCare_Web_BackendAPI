import { Sequelize } from "sequelize";
import config from "../config/config.js";

const sequelize = new Sequelize(config.db.name, config.db.userName, config.db.password, {
  host: config.db.host,
  port: config.db.port,
  dialect: config.db.type
});

export const DBConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log('DB Connection has been established successfully.'.brightCyan);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
export { sequelize }

