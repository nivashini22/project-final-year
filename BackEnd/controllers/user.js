const User = require("../models/user");
const Case = require("../models/case");

exports.signup = async (req, res) => {
  const userObj = new User(req.body);
  const user = await userObj.save();
  delete req.body.password;
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
  console.log(user.password)
  console.log(password)
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
  delete req.body.password;
  return res.status(200).json(req.body);
};

exports.updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    { _id: req.body._id },
    { $set: req.body },
    { new: true, useFindAndModify: false })
  return res.status(200).json(user);
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

exports.updateUserRequest = async (req, res) => {
  const user = await User.findOneAndUpdate(
    { _id: req.body._id },
    { $push: { requested_prisoners: req.body.requested_prisoners } },
  )
  return res.status(200).json(user);
}

exports.updateUserAccept = async (req, res) => {
  let objToUpdate = { lawyer_id: req.body.lawyer_id };
  if (req.body.isLawyer) {

  } else {
    objToUpdate = { counselor_id: req.body.counselor_id };
  }
  if (req.body.isAccepted) {
    await Case.findOneAndUpdate(
      { _id: req.body.case_id },
      objToUpdate,
    )
  }
  const user =  await User.findOneAndUpdate(
    { _id: req.body.lawyer_id },
    { requested_prisoners: req.body.requested_prisoners }
  )
  return res.status(200).json(user);
}