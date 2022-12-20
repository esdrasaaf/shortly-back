import connection from "../database/db.js"

export async function portUrl (req, res) {
    const { userId, url, shortUrl } = res.locals

    try {
        await connection.query('INSERT INTO urls ("userId", url, "shortUrl") VALUES ($1, $2, $3);', [userId, url, shortUrl]);
        const obj = {shortUrl}
        return res.status(201).send(obj)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}

export async function getUrlById (req, res) {
    const { id } = req.params

    try {
        const url = await connection.query('SELECT id, "shortUrl", url FROM urls WHERE id = $1;', [id]);
        return res.status(200).send(url.rows[0])
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}

export async function getOpenShortUrl (req, res) {
    const { shortUrl } = req.params
    const { url } = res.locals

    try {
        await connection.query('UPDATE urls SET "visitCount" = "visitCount" + 1 WHERE "shortUrl" = $1;', [shortUrl]);

        const targetUrl = url + req.originalUrl
        return res.redirect(targetUrl)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}

export async function deleteUrl (req, res) {
    const { id } = req.params

    try {
        await connection.query('DELETE FROM urls WHERE id = $1;', [id]);
        return res.sendStatus(204)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}