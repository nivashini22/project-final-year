const express = require("express");
const router = express.Router();
const { signup, signin, getUserById, createUser, updateUser, updateUserRating, updateUserScore, getAllUsers, updateUserRequest, updateUserAccept, getAllLawyers, getAllCounselors, getAllPrisoners } = require("../controllers/user");

router.post("/user/signup", signup);
router.post("/user/login", signin);

router.get("/users", getAllUsers);
router.get("/user/:user_id", getUserById);
router.get("/user/type/prisoners", getAllPrisoners);
router.get("/user/type/lawyers", getAllLawyers);
router.get("/user/type/counselors", getAllCounselors);
router.post("/user/create", createUser);
router.put("/user/update", updateUser);
router.put("/user/update/rate", updateUserRating);
router.put("/user/update/score", updateUserScore);
router.put("/user/update/request", updateUserRequest);
router.put("/user/update/accept", updateUserAccept);

module.exports = router;