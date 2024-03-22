const { User, College } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
     // throw AuthenticationError;
    },
  },

  Mutation: {
    saveCollege: async (parent, { newCollege }, context) => {
      if (context.user) {
        const updatedUser = User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedColleges: newCollege } },
          { new: true }
        );
        return updatedUser;
      }
      //throw new AuthenticationError("You must be logged in to save books!");
    },
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      console.log(token);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },

    removeCollege: async (parent, { collegeId }, context) => {
      if (context.user) {
        const updatedUser = User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { savedColleges: { collegeId } } },
          { new: true }
        );
        return updatedUser;
      }
      // throw new AuthenticationError("You must be logged in to save books!");
    },
  },
 
};

module.exports = resolvers;
