import connection from "../database/db.js"

export default async function getRanking (req, res) {
    try {
        const ranking = await connection.query('SELECT users.id, users.name, COUNT(urls."shortUrl") AS "linksCount", COALESCE(SUM(urls."visitCount"), 0) AS "visitCount" FROM users LEFT JOIN urls ON users.id = urls."userId" GROUP BY users.id ORDER BY "visitCount" DESC, "linksCount" DESC LIMIT 10;');
        return res.status(200).send(ranking.rows)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}