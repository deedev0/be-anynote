export const checkAuthentication = (req, res, next) => {
  console.log(req.session.user);
  if (!req.session.user) return res.status(401).send({ message: 'Not Authenticated'}); 

  next();
};
