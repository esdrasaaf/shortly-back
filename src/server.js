import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

import authRouters from "./routes/authRoutes.js";
import urlsRouters from "./routes/urlsRoutes.js";
import usersRouters from "./routes/usersRoutes.js";
import rankingRouters from "./routes/rankingRoutes.js";

// Configs
app.use(cors());
app.use(express.json());
app.use(authRouters);
app.use(urlsRouters);
app.use(usersRouters);
app.use(rankingRouters);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running in port ${port}`));