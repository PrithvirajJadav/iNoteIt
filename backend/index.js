import express from 'express'
import connectToMongo from './db.js'
import router from "./src/routes/index.js"
import cors from "cors"

const app = express();
const port = 3000;

connectToMongo();

app.use(express.json());
app.use(cors())
app.use(router);
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})