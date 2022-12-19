import connection from '../database/db.js'

export async function postSignUp (req, res) {
    const { name, email, password } = req.body

    try {
        await connection.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, password]);
        return res.sendStatus(201)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
    
}

export async function postSignIn (req, res) {
    res.send("signIn")
}