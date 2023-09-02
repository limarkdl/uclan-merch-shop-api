import User from './models/User.js';
import Role from './models/Role.js';
import bcrypt from 'bcryptjs';
import {validationResult} from 'express-validator';
import JWT from 'jsonwebtoken';

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return JWT.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({message: 'Registration error', errors});
            }
            const {username, password, email} = req.body;
            const candidate = await User.findOne({username});
            const candidateEmail = await User.findOne({email});
            if (candidate) {
                return res.status(400).json({message: 'User already exists'});
            }
            if (candidateEmail) {
                return res.status(400).json({message: 'Email is already used'});
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: 'USER'});
            const user = new User({username, password: hashPassword, email, roles: [userRole.value]});
            await user.save();
            return res.json({message: 'User was created'});


        } catch (e) {
            console.log(e);
            req.status(400).json({message: 'Registration error'});
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body;
            const user = await User.findOne({username});
            if(!user) {
                return res.status(400).json({message: `User ${username} not found`});
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if(!validPassword) {
                return res.status(400).json({message: 'Invalid password'});
            }
            const token = generateAccessToken(user._id, user.roles);
            return res.json({token});

        } catch (e) {
            console.log(e);
            req.status(400).json({message: 'Login error'});
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (e) {

        }
    }
}

export default new authController();