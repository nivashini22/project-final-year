const User = require("../models/user");

exports.signup = async (req, res) => {
  const userObj = new User(req.body);
  const user = await userObj.save();
  return res.status(200).json(req.body);
};

exports.signin = async (req, res) => {
  const { name, password, type } = req.body;
  const user = await User.findOne({ name, type });
  if (!user) {
    return res.status(400).json({
      error: "USER email does not exists"
    });
  }
  if (user.password != password) {
    return res.status(400).json({
      error: "Password does not match"
    });
  }
  delete user.password;
  return res.json(user);
};

exports.getAllUsers = async (req, res) => {
  const userObj = await User.find();
  return res.status(200).json(userObj);
}

exports.getUserById = async (req, res) => {
  const user_id = req.params.user_id;
  const userObj = await User.findOne(
    { _id: user_id },
  );
  return res.status(200).json(userObj);
};

exports.getAllLawyers = async (req, res) => {
  try {
    const userObj = await User.find({ type: 'LAWYER' }).exec();
    return res.status(200).json(userObj);
  } catch (error) {
    console.log(error.message)
  }
};

exports.getAllCounselors = async (req, res) => {
  try {
    const userObj = await User.find({ type: 'COUNSELOR' }).exec();
    return res.status(200).json(userObj);
  } catch (error) {
    console.log(error.message)
  }
};

exports.getAllPrisoners = async (req, res) => {
  try {
    const userObj = await User.find({ type: 'PRISONER' }).exec();
    return res.status(200).json(userObj);
  } catch (error) {
    console.log(error.message)
  }
};

exports.createUser = async (req, res) => {
  const userObj = new User(req.body);
  const user = await userObj.save();
  return res.status(200).json(req.body);
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.body._id },
      { $set: req.body },
      { new: true, useFindAndModify: false })
    return res.status(200).json(user);
  } catch (error) {
    console.log('error ', error)
    console.log('error ')
  }
}

exports.updateUserRating = async (req, res) => {
  const user = await User.findOneAndUpdate(
    { _id: req.body._id },
    { $push: { rating: req.body.rating } },
  )
  return res.status(200).json(user);
}

exports.updateUserScore = async (req, res) => {
  const user = await User.findOneAndUpdate(
    { _id: req.body._id },
    { $push: { test_score: req.body.score } },
  )
  return res.status(200).json(user);
}

exports.updateUserLawyerRequest = async (req, res) => {
  const user = await User.findOneAndUpdate(
    { _id: req.body._id },
    { $push: { 'isLawyer.requested_prisoners': req.body.requested_prisoner } },
  )
  return res.status(200).json(user);
}

exports.updateUserCounselorRequest = async (req, res) => {
  const user = await User.findOneAndUpdate(
    { _id: req.body._id },
    { $push: { 'isCounselor.requested_prisoners': req.body.requested_prisoner } },
  )
  return res.status(200).json(user);
}

exports.updateLawyerAccept = async (req, res) => {
  if (req.body.isAccepted) {
    await User.findOneAndUpdate(
      { _id: req.body.user_id },
      { 'isPrisoner.case.lawyer_id': req.body.lawyer_id }
    )
  }
  const user = await User.findOneAndUpdate(
    { _id: req.body.lawyer_id },
    { 'isLawyer.requested_prisoners': req.body.requested_prisoners }
  )
  return res.status(200).json(user);
}

exports.updateCounselorAccept = async (req, res) => {
  if (req.body.isAccepted) {
    await User.findOneAndUpdate(
      { _id: req.body.user_id },
      { 'isPrisoner.case.counselor_id': req.body.counselor_id }
    )
  }
  const user = await User.findOneAndUpdate(
    { _id: req.body.counselor_id },
    { 'isCounselor.requested_prisoners': req.body.requested_prisoners }
  )
  return res.status(200).json(user);
}

exports.updateUserPrisonerVideo = async (req, res) => {
  const user = await User.findOneAndUpdate(
    { _id: req.body._id },
    { $push: { 'isPrisoner.case.videos': req.body.video } },
  )
  return res.status(200).json(user);
}

exports.updateTestScore = async (req, res) => {
  // const userz = await User.findOneAndUpdate(
  //   { _id: req.body._id },
  //   { $set: { 'isPrisoner.test_score': {
  //     BDI: {
  //       isAttended: false,
  //       mark: 0
  //     },
  //     GAD: {
  //       isAttended: false,
  //       mark: 0
  //     },
  //     Stress: {
  //       isAttended: false,
  //       mark: 0
  //     },
  //     SAS: {
  //       isAttended: false,
  //       mark: 0
  //     },
  //     Anger: {
  //       isAttended: false,
  //       mark: 0
  //     }
  //   } } },
  // )
  // return res.status(200).json(userz);

  const { type, mark, _id } = req.body;
  let key = '';
  const test =  {
    isAttended: true,
    mark
  }
  if (type == 'BDI') {
    key = 'isPrisoner.test_score.BDI';
  } else if (type == 'GAD') {
    key = 'isPrisoner.test_score.GAD';
  } else if (type == 'Stress') {
    key = 'isPrisoner.test_score.Stress';
  } else if (type == 'SAS') {
    key = 'isPrisoner.test_score.SAS';
  } else if (type == 'Anger') {
    key = 'isPrisoner.test_score.Anger';
  } else {

  }
  const user = await User.findOneAndUpdate(
    { _id },
    { $set: { [key]: test } },
  )
  return res.status(200).json(user);
}
