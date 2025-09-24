const models = require("../../models/");
const user = require("../../models/user");
const User = require("../services/user/userServices");
// const { User } = require("../../models");
const userInstance = new User();
//CREATE
const createUser = async (req, res) => {
  // console.log(req.body);
  try {
    await userInstance.create(req, res);
  } catch (error) {
    // console.log(error.errors[0]);
    let errorMessage;

    const errorType = error && error.errors && error.errors[0];

    if (errorType && errorType.type === "unique violation") {
      if (errorType.path === "email") {
        errorMessage = "Email is already taken";
       
      }
    }
    return res.status(500).json({ error: errorMessage });
  }
};
/*
END CREATE
*/

//READ
const getAllUsers = async (req, res) => {
  try {
    if (!req.isAdmin) {
      return res.status(401).send("Unauthorized access");
    }
    res.status(200).json({ users: await userInstance.getAllUsers() });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const getUser = async (req, res) => {
  try {
    const result = await userInstance.getUser(req);
    if (!result) {
      return res.status(400).json({ errorMessage: "No user found" });
    }
    return res.status(201).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errorMesage: error });
  }
};
const getUsername = async (req, res) => {
  try {
    const result = await userInstance.getUsername(req);
    if (!result) {
      return res.status(400).json({ errorMessage: "No user found" });
    }
    return res.status(201).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errorMesage: error });
  }
};

const getUserOrders = async (req, res) => {
  try {
    if ((req.user && req.user.id === parseInt(req.params.id)) || req.isAdmin) {
      const result = await userInstance.getUserOrders(req);
      if (!result) {
        return res.status(400).json({ errorMessage: "No orders found" });
      }
      return res.status(200).json({ "user orders": result });
    }
    return res.status(401).send("Unauthorized access");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const getUserOrder = async (req, res) => {
  try {
    if ((req.user && req.user.id === parseInt(req.params.orderid)) || req.isAdmin) {
      const result = await userInstance.getUserOrder(req);
      if (!result) {
        return res.status(404).json({ message: "Order not found for this user" });
      }

      return res.status(200).json({ "user order": result });
    }
    return res.status(401).send("Unauthorized access");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

/*
END READ
*/

//UPDATE
const updateUser = async (req, res) => {
  try {
    if (req.user.id === req.params.id) {
      const result = await userInstance.updateUser(req);
      if (!result) {
        return res.status(400).send("Something went wrong with updating user");
      }
      // throw new Error(); returns the else: message
      return res.status(200).json(result);
    }

    return res.status(401).send("Unauthorized access");
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error:
        error.name === "SequelizeUniqueConstraintError"
          ? "Username already taken try another one"
          : "Something went wrong, try again.",
    });
  }
};
/*
END UPDATE
*/

//delete
const deleteUser = async (req, res, next) => {
  try {
    if (req.user.id != req.params.id) return res.status(400).send("Trouble deleting user");

    const result = await userInstance.deleteUser(req);
    return userInstance.logout(req, res, next, "Successfully deleted account");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
/* 
END DELETE
*/

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  getUsername /**testing */,
  updateUser,
  deleteUser,
  getUserOrders,
  getUserOrder,
};
