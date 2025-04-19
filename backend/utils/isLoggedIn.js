import AppError from '../error/AppError.js';

export const isLoggedIn = (req, res, next) => {
  if (!req.session.userId) {
    return next(new AppError(401, 'User is not logged in.'));
  }
  next();
};

