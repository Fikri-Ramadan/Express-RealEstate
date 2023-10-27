import { auth } from 'express-oauth2-jwt-bearer';

const jwtCheck = auth({
  audience: process.env.BASE_URL,
  issuerBaseURL: process.env.AUTH0_DOMAIN,
  tokenSingingAlg: 'RS256',
});

export default jwtCheck;
