const express = require('express')
const router = express.Router()

// router.use('/todo', todo)



router.use('/', (req, res)=> res.send("jesteś w indexsach PHOTO"))

module.exports = router