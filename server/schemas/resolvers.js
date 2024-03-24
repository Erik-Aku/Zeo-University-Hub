const { User, College } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const fetch = require('node-fetch');

let generateHashId;

(async () => {
  const helpersModule = await import('../../client/src/utils/helpers.js');
  generateHashId = helpersModule.generateHashId;
})();


const resolvers = {
	Query: {
		me: async (parent, args, context) => {
			if (context.user) {
				return User.findOne({ _id: context.user._id });
			}
		},
		searchColleges: async (_, { query }) => {
			if (!query) return [];

			const apiKey = process.env.API_KEY;
			const fields = 'school.name,school.city,school.state,latest.student.size';
			const endpoint = `https://api.data.gov/ed/collegescorecard/v1/schools?api_key=${apiKey}&school.name=${encodeURIComponent(query)}&fields=${fields}&per_page=50`;

			try {
				const response = await fetch(endpoint);
				if (!response.ok) {
					console.log(`HTTP error! status: ${response.status}`);
					console.log('Response Body:', await response.text());
					throw new Error('Network response was not ok');
				}

				const data = await response.json();
				const collegeData = data.results.map((college) => ({
					id: generateHashId(college['school.name'], college['school.city'], college['school.state']),
					name: college['school.name'],
					city: college['school.city'],
					state: college['school.state'],
					size: college['latest.student.size']
				}));
                console.log('Checkpoint 5', collegeData);
                return collegeData;
			} catch (error) {
				console.error('Error fetching college data:', error);
				throw new Error('Error fetching college data');
			}
		}
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
		},
		addUser: async (parent, { username, email, password }) => {
			const user = await User.create({ username, email, password });
			const token = signToken(user);
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
		}
	}
};

module.exports = resolvers;
