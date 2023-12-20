"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pass = void 0;
const passport_jwt_1 = require("passport-jwt");
const auth_1 = require("./auth");
//I have delete user from line 19 after null, it was like this: if (user) {
//   return done(null, user);
// }
const opts = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};
const pass = (passport) => {
    passport.use(new passport_jwt_1.Strategy(opts, (jwt_payload, done) => {
        const user = auth_1.users.find(u => u.username === jwt_payload.username);
        if (user) {
            return done(null, user);
        }
        return done(null, false);
    }));
};
exports.pass = pass;
//# sourceMappingURL=passport.auth.js.map