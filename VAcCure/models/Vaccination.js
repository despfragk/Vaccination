const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const VaccinationSchema = new Schema({
  username: {
    type: String,
    required: false
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  amka: {
    type: Number,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  dateDose1: {
    type: Date,
    required: true
  },
  doseOneCompleted:{
    type: Boolean,
    default: false
  },
  dateDose2: {
    type: Date,
    required: true
  },
  doseTwoCompleted:{
    type: Boolean,
    default: false
  },
  vaccineBrand: {
    type: String,
    required: true
  },
  symptoms: {
    type: String,
    required: false
  },
  comments: {
    type: String,
    required: false
  },
  stage: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Vaccination = mongoose.model("vaccinations", VaccinationSchema);
