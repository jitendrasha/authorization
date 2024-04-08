const userServices = require("../services/userServices");

const jwt = require('jsonwebtoken')
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");


const JwtAppStrategy = new JwtStrategy({
     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
     ignoreExpiration:true,
     secretOrKey :'secret',
},
     (jwtPayload, done) => {
          const { _id, email } = jwtPayload
          console.log(_id, email,'12222'
          )
          if (!_id || !email) {
               return done('unauthroised access')
          }
          userServices.fetchById(_id, email, (err, user) => {
            if (err) {
              return done("error  in login");
            }
            if (!user.status) {
              return done("Deactivated User");
               }
               return done(null, user)
          });
     } 


)

const generateJwt = async (payload) => {
	try {
			 const secret = 'secret';
          const token = await jwt.sign(
				payload,
				secret
			);
			return token;
	} catch (err) {
		return err;
	}
};


const authenticateApp = () =>
     passport.authenticate('app',
          {
               session: false
          });


module.exports = {
  JwtAppStrategy,
  authenticateApp,
  generateJwt,
};
