import { Schema } from "mongoose";

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const collegeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  // saved collegeId from api

  collegeId: {
    type: String,
    required: true,
  },
  tuition: {
    type: String,
  },

  size: {
    type: Number,
  },

  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  degrees: {
    type: String,
    required: true,
  },
  admissions: {
    type: String,
  },
});

export default collegeSchema;
