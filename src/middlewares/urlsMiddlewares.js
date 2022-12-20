import { customAlphabet } from 'nanoid'
import connection from '../database/db.js'
import { shortenSchema } from '../models/urlsModels.js'

export async function shortenValidation (req, res, next) {
    const { url } = req.body
    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", "")
    const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890', 6)

    const { error } = shortenSchema.validate(req.body, { abortEarly: false });
    if (error){
        const errors = error.details.map((detail)=> detail.message);
        return res.status(422).send(errors);
    }

    try {
        const sessionsExist = await connection.query('SELECT * FROM sessions WHERE token = $1;', [token])
        if (sessionsExist.rowCount === 0) {
            return res.sendStatus(401)
        }

        res.locals.userId = sessionsExist.rows[0].userId
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }

    res.locals.url = url
    res.locals.shortUrl = nanoid()
    next()
}

export async function getByIdValidation (req, res, next) {
    const { id } = req.params

    try {
        const urlExist = await connection.query('SELECT * FROM urls WHERE id = $1;', [id]);
        if (urlExist.rowCount === 0) {
            return res.sendStatus(404)
        }
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }

    next()
}

export async function openShortValidation (req, res, next) {
    const { shortUrl } = req.params

    try {
        const shortExist = await connection.query('SELECT * FROM urls WHERE "shortUrl" = $1;', [shortUrl]);
        if (shortExist.rowCount === 0) {
            return res.sendStatus(404)
        }

        res.locals.url = shortExist.rows[0].url
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }

    next()
}

export async function deleteValidation (req, res, next) {
    const { id } = req.params
    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", "")

    try {
        const sessionsExist = await connection.query('SELECT * FROM sessions WHERE token = $1;', [token])
        if (sessionsExist.rowCount === 0) {
            return res.sendStatus(401)
        }

        const shortUrl = await connection.query('SELECT * FROM urls WHERE id = $1;', [id])
        if (shortUrl.rowCount === 0) {
            return res.sendStatus(404)
        }

        if (sessionsExist.rows[0].userId !== shortUrl.rows[0].userId) {
            return res.sendStatus(401)
        }
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }

    next()
}