import connection from "../database/db.js"

export default async function getUserValidation (req, res, next) {
    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", "")

    try {
        const sessionsExist = await connection.query('SELECT * FROM sessions WHERE token = $1;', [token]);
        if (sessionsExist.rowCount === 0) {
            return res.sendStatus(401)
        }

        const userExist = await connection.query('SELECT * FROM users WHERE id = $1;', [sessionsExist.rows[0].userId]);
        if (userExist.rowCount === 0) {
            return res.sendStatus(404)
        }

        res.locals.userId = sessionsExist.rows[0].userId
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }

    next()
}