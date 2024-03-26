const express = require("express");
const router = express.Router();
const { getCaseById, createCase, updateCase } = require("../controllers/case");

router.get("/case/:case_id", getCaseById);
router.post("/case/create", createCase);
router.put("/case/update", updateCase);

module.exports = router;