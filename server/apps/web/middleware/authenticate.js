const jwt = require('jwt-simple');
const passport = require('passport');
const { ExtractJwt, Strategy } = require('passport-jwt');

let opts = {
  passReqToCallback: true,
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromAuthHeaderWithScheme("JWT"),
    ExtractJwt.fromUrlQueryParameter("jwt")
  ])
}

passport.use(new Strategy(opts, (req, payload, done) => {
  req.loggedUser = payload;
  done(null, payload);
}));

// custom callback - http://www.passportjs.org/docs/authenticate/ 
module.exports = function(req, res, next) {
  passport.authenticate('jwt', { session: false }, function(err, user, info) {

    // user = false: unauthenticated
    if (!user) {
      return res.status(401).send("Unauthenticated");
    }

    req.user = user;
    next();
  })(req, res, next);
};