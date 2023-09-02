import JWT from "jsonwebtoken";

export default function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({message: 'Not authorized'});
        }
        req.user = JWT.verify(token, process.env.JWT_SECRET);
        next();

    } catch (e) {
        console.log(e);
        res.status(401).json({message: 'Not authorized'});
    }
}