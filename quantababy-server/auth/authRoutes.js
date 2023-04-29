import express from 'express';
import passport from 'passport';
import { register, login, protectedRoute, logout } from './authController.js';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.get(
  '/protected',
  passport.authenticate('jwt', { session: false }),
  protectedRoute
);

export default authRouter;
