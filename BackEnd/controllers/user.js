const User = require("../models/user");

exports.signup = async (req, res) => {
    const userObj = new User(req.body);
    const user = await userObj.save();
    delete req.body.password;
    return res.status(200).json(req.body);
};

exports.signin = async (req, res) => {
    const { name, password } = req.body;
    const user = await User.findOne({ name });
    if (!user) {
        return res.status(400).json({
            error: "USER email does not exists"
        });
    }
    if (user.password !== password) {
        return res.status(400).json({
            error: "Password does not match"
        });
    }
    delete user.password;
    return res.json(user);
};

exports.getUserById = async (req, res) => {
    const user_id = req.params.user_id;
    const userObj = await User.findOne(
      { _id: user_id },
    );
    return res.status(200).json(userObj);
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
    user.password = undefined;
    return res.status(200).json(user);
}
