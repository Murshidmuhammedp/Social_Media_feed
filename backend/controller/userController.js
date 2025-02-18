import bcrypt from 'bcrypt'
import User from '../models/UserModel.js';
import Jwt from 'jsonwebtoken'

export const userSignup = async (req, res) => {
    try {

        const { username, email, password } = req.body

        if (!username || !email || !password) {
            return res.status(404).json({ message: "Input field required" })
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(200).json({ message: "E-mail already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        return res.status(201).json({ message: "Registered successfully", data: newUser });

    } catch (error) {

        console.log(error, "Error found in user login")
    }
}

export const userSignin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const validUser = await User.findOne({ email });

        if (!validUser) {
            return res.status(404).json({ message: "User not found" });
        };

        if (validUser.isDeleted == true) {
            return res.status(400).json({ message: "Your account is suspended" });
        };

        const validpassword = bcrypt.compareSync(password, validUser.password);
        if (!validpassword) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const token = Jwt.sign({ id: validUser._id }, process.env.USER_JWT_SECRET_KEY);
        const { password: hashedPassword, ...rest } = validUser._doc;
        const expiryDate = new Date(Date.now() + 60 * 1000);
        res.cookie('access_token', token, { httpOnly: true, expires: expiryDate });
        return res.status(200).json({ message: "successfully login", token, data: rest });

    } catch (error) {
        console.log(error, "Error found in user login")

    }
}