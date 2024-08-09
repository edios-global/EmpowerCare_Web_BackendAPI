import MenuOption from "../models/menuOptionModel.js";
import asyncHandler from 'express-async-handler'
import User from "../models/userModel.js";
import RoleRights from "../models/roleRight.js";

export const fetchMenuOption = asyncHandler(async (req, res) => {
  try {

    let menu = await MenuOption.findAll({ where: { USER_TYPE: "Admin" } })
    if (menu) {
      return res.status(200).json({ STATUS: true, MESSAGE: "Menu Option Fetched Successfully", OUTPUT: menu });
    } else {
      return res.status(400).json({ STATUS: false, MESSAGE: "Something Went Wrong", OUTPUT: [] });
    }
  } catch (error) {
    console.log("OTPVerification error: ", error);

    return res.status(500).json({ STATUS: false, MESSAGE: error.message, OUTPUT: [] });
  }
});
export const addUserAndPermission = asyncHandler(async (req, res) => {
  try {
    const { EMAIL_ADDRESS, SELECTED_ACCESS, USER_TYPE, SELECTED_VALUES } = req.body;
    req.body.USER_STATUS = "Active"
    const newUser = await User.create(req.body);
    const userId = newUser.toJSON().ID;
    let permissions;
    if (SELECTED_ACCESS === "custom" && SELECTED_VALUES) {
      permissions = SELECTED_VALUES.map(item => ({
        ...item,
        USER_ID: userId
      }));
    } else if (SELECTED_ACCESS === "admin") {
      const menuOptions = await MenuOption.findAll({ where: { USER_TYPE } });
      permissions = menuOptions.toJSON().map(item => ({
        ...item,
        USER_ID: userId
      }));
    } else {
      return res.status(400).json({ STATUS: false, MESSAGE: "Invalid access type", OUTPUT: [] });
    }
    const createdPermissions = await RoleRights.bulkCreate(permissions);
    if (createdPermissions) {
      return res.status(200).json({ STATUS: true, MESSAGE: "User Added Successfully!", OUTPUT: [] });
    } else {
      return res.status(500).json({ STATUS: false, MESSAGE: "Failed to create permissions", OUTPUT: [] });
    }
  } catch (error) {
    console.log("Error in addUserAndPermission: ", error);
    return res.status(500).json({ STATUS: false, MESSAGE: error.message, OUTPUT: [] });
  }
});

export const fetchUser = asyncHandler(async (req, res) => {
  try {
    const{ ID } = req.query
   
  
    let fetchUser;
    if (ID)
      fetchUser = await User.findAll({
        where: { ID: ID },
        include: [{
          model: RoleRights,
          where: { USER_ID: ID }
        }]
      });
    else
      fetchUser = await User.findAll({
        where: { ID: ID },
        include: [{
          model: RoleRights,
          where: { USER_ID: ID }
        }]
      });
    // const {USER_TYPE } = req.query;
    if (fetchUser) {
      return res.status(200).json({ STATUS: true, MESSAGE: "Users Fetched Successfully", OUTPUT: fetchUser });
    } else {
      return res.status(400).json({ STATUS: false, MESSAGE: "Something Went Wrong", OUTPUT: [] });
    }

  } catch (error) {
    console.log("Error in addUserAndPermission: ", error);
    return res.status(500).json({ STATUS: false, MESSAGE: error.message, OUTPUT: [] });
  }

});
export const deleteUser = asyncHandler(async (req, res) => {
  try {
    const { ID } = req.body;
    await RoleRights.destroy({
      where: {
        USER_ID: ID
      }
    })
    const result = await User.destroy({
      where: {
        ID: ID
      }
    });
    if (result == 1) {
      return res.status(200).json({ STATUS: true, MESSAGE: "Deleted Successfully", OUTPUT: [] });
    } else {
      return res.status(200).json({ STATUS: false, MESSAGE: "Something Went Wrong!", OUTPUT: [] });
    }
  } catch (error) {
    console.log("Error in addUserAndPermission: ", error);
    return res.status(500).json({ STATUS: false, MESSAGE: error.message, OUTPUT: [] });
  }
});

export const updateUser = asyncHandler(async (req, res) => {
  try {
    const { ID } = req.body;


    console.log("adasd" ,req.body )
    // await RoleRights.destroy({
    //   where: {
    //     USER_ID: ID
    //   }
    // })
    // const result = await User.destroy({
    //   where: {
    //     ID: ID
    //   }
    // });
    // if (result == 1) {
    //   return res.status(200).json({ STATUS: true, MESSAGE: "Deleted Successfully", OUTPUT: [] });
    // } else {
    //   return res.status(200).json({ STATUS: false, MESSAGE: "Something Went Wrong!", OUTPUT: [] });
    // }
  } catch (error) {
    console.log("Error in addUserAndPermission: ", error);
    return res.status(500).json({ STATUS: false, MESSAGE: error.message, OUTPUT: [] });
  }
});