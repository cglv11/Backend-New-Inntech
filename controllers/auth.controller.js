const { response } = require("express");
const bcryptjs = require("bcryptjs")

const { generateJWT } = require("../helpers/generate-jwt");
const { User } = require("../models");

const login = async (req, res = response) => {

    const  { email, password } = req.body;

    try {

        const user = await User.findOne({ where: { email: email } });
        
        // Verificar si el email existe
        if (!user) {
            return res.status(400).json({
                msg: `El correo ${email} no existe`
            });
        }

        if (!user.state) {
            return res.status(400).json({
                msg: `El correo ${email} no existe`,
            });
        }

        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'La contraseña no es correcta',
            });
        }

        const token = await generateJWT(user.id);

        const userResponse = user.toJSON();
        delete userResponse.password;

        res.json({
            user: userResponse,
            token,
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ 
            msg: 'Ocurrió un error inesperado. Por favor, intente nuevamente.'
        })
    }
}

const validateToken = async (req, res = response ) => {

    // Valida el JWT
    if( req.user ){
        
        const token = req.header('x-token');
        res.json({
            user: req.user,
            token: token,
        })
    }

}

module.exports = {
    login,
    validateToken
}