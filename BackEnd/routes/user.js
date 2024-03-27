const express = require("express");
const router = express.Router();
const { signup, signin, getUserById, createUser, updateUser, updateUserRating, updateUserScore } = require("../controllers/user");

router.post("/user/signup", signup);
router.post("/user/login", signin);

router.get("/user/:user_id", getUserById);
router.post("/user/create", createUser);
router.put("/user/update", updateUser);
router.put("/user/update/rate", updateUserRating);
router.put("/user/update/score", updateUserScore);

module.exports = router;