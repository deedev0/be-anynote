export const checkAuthentication = (req, res, next) => {
  if (!req.session.user) return res.status(401).send({ message: 'Not Authenticated'}); 

  next();
};
