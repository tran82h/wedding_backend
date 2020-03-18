module.exports = function (req, res, next) {

  if (!req.user.isAdmin) return status(403).send('Access denied.');

  next();
}