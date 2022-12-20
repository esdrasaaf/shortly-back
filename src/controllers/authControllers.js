import connection from '../database/db.js'

export async function postSignUp (req, res) {
    const { name, email } = req.body
    const password = res.locals.passwordHash

    try {
        await connection.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, password]);
        return res.sendStatus(201)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}

export async function postSignIn (req, res) {
    const { token, userId } = res.locals

    try {
        const sessionExist = await connection.query('SELECT * FROM sessions WHERE "userId" = $1;', [userId])
        if (sessionExist.rowCount > 0) {
            await connection.query('UPDATE sessions SET token = $1 WHERE "userId" = $2;', [token, userId])
            return res.status(200).send(token)
        } else {
            await connection.query('INSERT INTO sessions ("userId", token) VALUES ($1, $2);', [userId, token])
            return res.status(200).send(token)
        }

    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}