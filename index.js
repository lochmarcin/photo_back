const express = require('express')
const router = express.Router()
const saveFile = require('./components/saveFile')

// router.use('/todo', todo)



router.use('/save', saveFile)
router.use('/', (req, res)=> res.send("jesteś w indexsach PHOTO"))

module.exports = router