import { Router } from 'express';
import { AuthController } from './auth.controller';
import { authService } from './auth.middleware';

const router = Router();
const authController = new AuthController();

const bindSignin = authController.signin.bind(authController);
const bindSignup = authController.signup.bind(authController);
const bindForgotPassword = authController.forgotPassword.bind(authController);
const bindResetPassword = authController.resetPassword.bind(authController);
const bindVerifyEmail = authController.verifyEmail.bind(authController);
const bindGetUserData = authController.getUserData.bind(authController);

router.post('/signup', bindSignup);
router.post('/login', bindSignin);
router.post('/forgot-password', bindForgotPassword);
router.post('/reset-password', bindResetPassword);
router.post('/verify-email', bindVerifyEmail);
router.get('/user', authService.verifyToken, bindGetUserData);

export default router;
