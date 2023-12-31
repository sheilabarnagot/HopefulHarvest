import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { PassportStatic } from 'passport';
import { users } from './auth';

//I have delete user from line 19 after null, it was like this: if (user) {
//   return done(null, user);
// }

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

export const pass = (passport: PassportStatic) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      const user = users.find(u => u.username === jwt_payload.username);

      if (user) {
        return done(null, user);
      }

      return done(null, false);
    })
  );
};
