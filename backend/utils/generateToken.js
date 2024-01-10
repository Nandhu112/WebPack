import jwt from "jsonwebtoken";

const generateToken = (res, user) => { // Pass 'user' as a parameter
    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000
    });
}

export default generateToken;