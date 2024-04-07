const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  photo: {
    type: String
  },
  type: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 4
  },
  dob: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  cases: {
    type: Array,
    default: []
  },
  requested_prisoners: {
    type: Array,
    default: []
    
    // {
    //   case_id: '',
    //   isAccepted: false,
    //   isAnswered: false
    // }
  },
  rating: {
    type: Array,
    default: []
  },
  test_score: {
    type: Array,
    default: []
  },
  isReleased: {
    type: Boolean,
    default: false
  }
}, { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
