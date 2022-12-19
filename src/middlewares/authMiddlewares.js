import { signUpSchema } from "../models/authModels.js";
import connection from "../database/db.js";

export async function signUpValidation (req, res, next) {
    const { email } = req.body

    const { error } = signUpSchema.validate(req.body, { abortEarly: false });

    if (error){
        const errors = error.details.map((detail)=> detail.message);
        return res.status(422).send(errors);
    }

    try {
        const userExist = await connection.query('SELECT * FROM users WHERE email = $1;', [email]);
        if (userExist.rows.length > 0) {
            return res.sendStatus(409)
        }

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
        
    next();
}