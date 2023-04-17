
import {Strategy as LocalStrategy} from 'passport-local';
import bcrypt from "bcrypt";
import { findOne } from './models/User.js';

const verifyCallback = async (email, password, done) => {
  try {
    const user = await findOne({ email });

    if (!user) {
      return done(null, false, { message: 'Incorrect email' });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return done(null, false, { message: 'Incorrect password' });
    }

    return done(null, user);
  } catch (err) {
    done(err);
  }
};

const passportConfig = (passport) => {
  passport.use(new LocalStrategy({ usernameField: 'email' }, verifyCallback));

  passport.serializeUser((user, done) => {
    console.log('Serializing user:', user);

    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    console.log('Deserializing user with id:', id);

    try {
      const user = await findOne({ id });
      console.log('User found:', user);

      done(null, user);
    } catch (err) {
      console.error('Error deserializing user:', err);

      done(err, null);
    }
  });
};

export default passportConfig;