import 'reflect-metadata'
import "./shared/container"
import express from 'express'
import cors from 'cors'
import sequelize from './db/config'
import associaton from './db/association'
import routes from './shared/http/routes'

require('dotenv').config()

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)

const port = process.env.PORT

associaton.init(() => {
  sequelize.sync({ force: false })
  .then(() => {
    console.log("Connection has been estabilished with successfully🚀🚀");

    app.listen(port, () => {
      console.log("🚀API RUNNING🚀")
    })
  })
  .catch((err) => {
    console.log("Wops! Something went wrong: " + err);
  })
})
