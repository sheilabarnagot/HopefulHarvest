import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { PassportStatic } from 'passport';
import { users } from './auth';
import { client } from './server';

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
