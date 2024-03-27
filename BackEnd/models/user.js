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
    default: [
      {
        _id: {
          type: String,
          required: true
        },
        isAccepted: {
          type: Boolean,
          default: false,
          required: true
        },
        isAnswered: {
          type: Boolean,
          default: false,
          required: true
        }
      }
    ]
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
