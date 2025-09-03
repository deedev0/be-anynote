export const checkAuthorizationUser = (req, res, next) => {
  const { id } = req.params;
  const user = req.session.user;
  
  if (user._id !== id) return res.status(403).send({ message: 'Forbidden'});


  next();
};
