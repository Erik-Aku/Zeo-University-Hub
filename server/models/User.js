import { Schema, model } from "mongoose";
import { hash, compare } from "bcrypt";

// import schema from College.js
import collegeSchema from "./College";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    // set savedColleges to be an array of data that adheres to the collegeSchema
    savedColleges: [collegeSchema],
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return compare(password, this.password);
};

// when we query a user, we'll also get another field called `collegeCount` with the number of saved colleges we have
userSchema.virtual("collegeCount").get(function () {
  return this.savedColleges.length;
});

const User = model("User", userSchema);

export default User;
