const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 4
  },
  type: {
    type: String,
    required: true
  },
  photo: {
    type: String
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
  isPrisoner: {
    type: Object,
    default: {
      case: {
        number: '',
        title: '',
        description: '',
        charge: '',
        date_joined: '',
        duration_of_sentence: '',
        lawyer_id: '',
        counselor_id: '',
        videos: []
        // {
        //   title: '',
        //   url:
        // }
      },
      test_score: [],
      isReleased: false
    }
  },
  isLawyer: {
    type: Object,
    default: {
      requested_prisoners: [],
      // {
      //   user_id: '',
      //   isAccepted: false,
      //   isAnswered: false
      // }
      specialization: '',
      review: ''
    },
  },
  isCounselor: {
    type: Object,
    default: {
      requested_prisoners: [],
      counselingNeed: '',
      expertise: '',
      expertiseLevel: ''
    }
  }
}, { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
