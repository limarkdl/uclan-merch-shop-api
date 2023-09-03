import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authentication = async (req, res, next) => {
  try {
    // Get token from the header
    const token = req.header('Authorization').replace('Bearer ', '');

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user with the given id and ensure they're still valid
    const user = await User.findOne({_id: decoded.id});

    if (!user) {
      return res.status(401).send({error: 'Token expired'});
    }

    // Attach the user and token to the request object
    req.user = user;
    req.token = token;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    res.status(401).send({error: 'Please authenticate.'});
  }
};

export default authentication;
