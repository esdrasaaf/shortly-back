import connection from "../database/db.js"

export default async function getUsers (req, res) {
    const { userId } = res.locals

    try {
        const userDatas = await connection.query(`SELECT u.id, u.name, SUM(urls."visitCount") AS "visitCount", JSON_AGG(JSON_BUILD_OBJECT ('id', urls.id, 'shortUrl', urls."shortUrl", 'url', urls.url, 'visitCount', urls."visitCount")) AS "shortenedUrls" FROM users u JOIN urls ON urls."userId" = u.id WHERE u.id = $1 GROUP BY u.id;`, [userId]);
        return res.status(200).send(userDatas.rows[0])
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}