import express from 'express';
import passport from 'passport';
import { register, login, logout } from './authController.js';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);

export default authRouter;
