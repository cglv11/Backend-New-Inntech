const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validateJWT = async ( req = request, res = response, next ) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
          
        // Lee usuario que corresponde al uid
        const user = await User.findByPk(uid);

        // Verificar si el token-uid existe
        if (!user) {
            return res.status(401).json({
                msg: 'Token inválido - Usuario no existe en DB'
            })
        }

        // Verificar si el estado del usuario (uid) está borrado (false)
        if ( user != null ) {
            // Si el usuario está activo
            if ( !user.state )
                return res.status(401).json({
                    msg: 'Token inválido - Usuario no existe en DB'
            });
              
            req.user = user;
        }

        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }

}

module.exports = {
    validateJWT
}