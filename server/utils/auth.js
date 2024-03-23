import { GraphQLError } from 'graphql';
import { verify, sign } from 'jsonwebtoken';

const secret = 'mysecretssshhhhhhh';
const expiration = '2h';

export const AuthenticationError = new GraphQLError('Could not authenticate user.', {
  extensions: {
    code: 'UNAUTHENTICATED',
  },
});
export function authMiddleware({ req }) {
  let token = req.body.token || req.query.token || req.headers.authorization;

  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  if (!token) {
    return req;
  }

  try {
    const { data } = verify(token, secret, { maxAge: expiration });
    req.user = data;
  } catch {
    console.log('Invalid token');
  }

  return req;
}
export function signToken({ email, username, _id }) {
  const payload = { email, username, _id };
  return sign({ data: payload }, secret, { expiresIn: expiration });
}
