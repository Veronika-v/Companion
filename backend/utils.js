const jwt = require("jsonwebtoken");

generateToken = (user) =>{
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
        }, process.env.JWT_SECRET || 'somesecrettext',
        {
            expiresIn: '24h'
        }
        );
}

module.exports = generateToken;