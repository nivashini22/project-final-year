const express = require("express");
const router = express.Router();
const { signup, signin, getUserById, createUser, updateUser, updateUserRating, updateUserScore, getAllUsers, getAllLawyers, getAllCounselors, getAllPrisoners, updateUserCounselorRequest, updateUserLawyerRequest, updateCounselorAccept, updateLawyerAccept, updateUserPrisonerVideo, updateTestScore } = require("../controllers/user");

router.post("/user/signup", signup);
router.post("/user/login", signin);

router.get("/users", getAllUsers);
router.get("/user/:user_id", getUserById);
router.get("/user/type/prisoners", getAllPrisoners);
router.get("/user/type/lawyers", getAllLawyers);
router.get("/user/type/counselors", getAllCounselors);
router.post("/user/create", createUser);
router.put("/user/update", updateUser);

// not used
router.put("/user/update/rate", updateUserRating);
router.put("/user/update/score", updateUserScore);

router.put("/user/update/prisoner/test", updateTestScore);
router.put("/user/update/prisoner/video", updateUserPrisonerVideo);
router.put("/user/update/lawyer/request", updateUserLawyerRequest);
router.put("/user/update/counselor/request", updateUserCounselorRequest);
router.put("/user/update/lawyer/accept", updateLawyerAccept);
router.put("/user/update/counselor/accept", updateCounselorAccept);


module.exports = router;