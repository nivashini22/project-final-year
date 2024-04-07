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
  await caseObj.save();
  for (let index = 0; index < req.body.offenders.length; index++) {
    const id = req.body.offenders[index];
    await User.findOneAndUpdate(
      { _id: id },
      { $push: { cases: caseObj._id } },
    )
  }
  return res.status(200).json(req.body);
};

exports.updateCase = async (req, res) => {
  const caseObj = await Case.findByIdAndUpdate(
    { _id: req.body._id },
    { $set: req.body },
    { new: true, useFindAndModify: false })
  return res.status(200).json(caseObj);
}
exports.updateCaseLawyer = async (req, res) => {
  const caseObj = await Case.findOneAndUpdate(
    { _id: req.body._id },
    { lawyer_details: req.body.lawyer_details }
  )
  return res.status(200).json(caseObj);
}

