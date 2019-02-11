import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/UserModel';

export default class PassportConfig {
    public secretOrKey = 'SuperTajnySekret';
    public jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

    public init() {
        passport.use('login', new LocalStrategy(async (
            username,
            password,
            done: (err: any, user?: InstanceType<typeof User> | false, info?: any) => void) => {
                try {
                    const user = await User.findOne({ username });
                    if ( !user ) {
                      return done(null, false, { message : 'User not found'});
                    }
                    const validate = await user.isValidPassword(password);
                    if ( !validate ) {
                      return done(null, false, { message : 'Wrong Password'});
                    }
                    return done(null, user, { message : 'Logged in Successfully'});
                  } catch (error) {
                    return done(error);
                  }
            },
        ));
        passport.use(new JwtStrategy({
            secretOrKey : this.secretOrKey,
            jwtFromRequest : this.jwtFromRequest,
          }, async (token, done) => {
                try {
                    return done(null, token.user);
                } catch (err) {
                    done(err);
                }
            },
        ));
    }
}
