import { signUpSchema, signInSchema } from "../models/authModels.js";
import connection from "../database/db.js";
import bcrypt from 'bcrypt';
import {v4 as uuidV4 }from 'uuid';

export async function signUpValidation (req, res, next) {
    const { email, password, confirmPassword } = req.body

    const { error } = signUpSchema.validate(req.body, { abortEarly: false });
    if (error){
        const errors = error.details.map((detail)=> detail.message);
        return res.status(422).send(errors);
    }
    
    if (password !== confirmPassword) {
        return res.status(422).send("As senhas estão diferentes!")
    }

    try {
        const userExist = await connection.query('SELECT * FROM users WHERE email = $1;', [email]);
        if (userExist.rowCount > 0) {
            return res.sendStatus(409)
        }

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }

    res.locals.passwordHash = bcrypt.hashSync(password, 10)
    next();
}

export async function signInValidation (req, res, next) {
    const { email, password } = req.body

    const { error } = signInSchema.validate(req.body, { abortEarly: false });

    if (error){
        const errors = error.details.map((detail)=> detail.message);
        return res.status(422).send(errors);
    }

    try {
        const userExist = await connection.query('SELECT * FROM users WHERE email = $1;', [email]);
        if (userExist.rowCount === 0) {
            return res.sendStatus(401)
        }

        const correctPass = bcrypt.compareSync(password, userExist.rows[0].password)

        if (!correctPass) {
            return res.sendStatus(401)
        }

        res.locals.userId = userExist.rows[0].id
        res.locals.token = uuidV4()
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }

    next()
} 