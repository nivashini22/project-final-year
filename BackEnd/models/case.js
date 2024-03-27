const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  incarcerated_date: {
    type: String,
    required: true,
  },
  duration_of_sentence: {
    type: String,
    required: true,
  },
  offenders: {
    type: Array,
    default: [],
  }
}, { timestamps: true }
);
module.exports = mongoose.model("Case", caseSchema);

