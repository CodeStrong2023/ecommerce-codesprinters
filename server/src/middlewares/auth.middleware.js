import jwt from "jsonwebtoken";

// FUNCION CREADA PARA MOSTRAR LOS HEADERS -AUTORIZAR USUARIO 
export const isAuth = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        
        return res.status(401).json({
            message: 'No hay token'
        });
    }
   jwt.verify(token, "xyz1234", (err, decoded) => {
        if (err) 
            return res.status(401).json({
                message: 'No estas autorizado'
            });
        req.usuarioId = decoded.id;
        next();
    });
};