const express = require("express");
const router = express.Router();
const { signup, signin, getUserById, createUser, updateUser } = require("../controllers/user");

router.post("/user/signup", signup);
router.post("/user/login", signin);

router.get("/user/:user_id", getUserById);
router.post("/user/create", createUser);
router.put("/user/update", updateUser);

module.exports = router;