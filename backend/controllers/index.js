import * as authController from './auth.controller.js';
import * as userController from './user.controller.js';
import * as bookController from './book.Controller.js';

export default {
  ...authController,
  ...userController,
  ...bookController
};
