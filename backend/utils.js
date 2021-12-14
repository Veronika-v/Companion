const jwt = require("jsonwebtoken");


module.exports = {
    generateToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                birthDate: user.birthDate,
                role: user.role,
                login: user.login,
                email: user.email,
                image: user.image,
                nativeTown: user.nativeTown,
                education: user.education,
                phoneNumber: user.phoneNumber,
                aboutUser: user.aboutUser,
                genderId: user.genderId,
            },
            process.env.JWT_SECRET || 'somesecrettext',
            {
                expiresIn: '24h'
            }
        );
    },

    isAuth: (req, res, next) => {
        const authorization = req.headers.authorization;
        if (authorization) {
            const token = authorization.slice(7, authorization.length); // Bearer xxxxxxxxx
            jwt.verify(
                token,
                process.env.JWT_SECRET || 'somesecrettext',
                (err, decode) => {
                    if (err) {
                        res.status(401).send('Invalid Token')
                    } else {
                        req.user = decode;
                        next();
                    }
                })
        } else {
            res.status(401).send('No Token')
        }
    },
    isAdmin: (req, res, next) => {
        if (req.user && req.user.role) {
            next();
        } else {
            res.status(401).send({message: 'Invalid Admin Token'});
        }
    }
}