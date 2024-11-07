import jwt from "jsonwebtoken";

// CREACION DEL TOKEN
export const creatAccessToken = (payload) => {
    return new Promise((resolve, reject) => {  
        jwt.sign(payload, "xyz1234", { expiresIn: "1d" }, (err, token) => {
            if (err) reject(err);  // Si hay error, rechaza la promesa
            resolve(token);  // Si no hay error, resuelve la promesa con el token
        });
    });
};