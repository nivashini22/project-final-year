const Case = require("../models/case");
const User = require("../models/user");

exports.getCaseById = async (req, res) => {
  const case_id = req.params.case_id;
  const caseObj = await Case.findOne(
    { _id: case_id },
  );
  return res.status(200).json(caseObj);
};

exports.createCase = async (req, res) => {
  const caseObj = new Case(req.body);
  const userId = req.body.user_id;
  await User.findOneAndUpdate(
    { _id: userId },
    { $push: { case: caseObj._id } },
  )
  await caseObj.save();
  return res.status(200).json(req.body);
};

exports.updateCase = async (req, res) => {
  const caseObj = await Case.findByIdAndUpdate(
    { _id: req.body._id },
    { $set: req.body },
    { new: true, useFindAndModify: false })
  return res.status(200).json(caseObj);
}