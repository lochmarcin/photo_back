const express = require('express')
const routes = require('./index')
const cors = require('cors')
const path = require('path');
const bodyParser = require('body-parser')



const port = 5000

const app = express()

app.use(bodyParser.json({ limit: '100mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }))

app.listen(port, () => {
    console.log("serwer PHOTO działa na porcie " + port)
})

app.use(
    cors({
        origin: [
            // "51.83.134.120",
            // "http://51.83.134.120",
            "http://tebuty.pl",
            "http://motopres.tebuty.pl",
            "http://localhost:3000",
            "http://127.0.0.1:3000",            
            "http://192.168.1.143:8081",
            "https://localhost:3000",
            "https://127.0.0.1:3000" ,
            "http://81.162.209.192:8123"           
        ],
        allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'],
        credentials: true,
        exposedHeaders: ['Content-Range', 'X-Content-Range']
    })
)


express.static(path.join(__dirname, '/uploads'));




app.use('/', routes)


