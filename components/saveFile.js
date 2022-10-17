const express = require('express')
const router = express.Router()
const fs = require("fs")
const dirname = require("../dirname")
const multer = require("multer")



// const maxSize = 1 * 1000 * 1000 * 100 * 10;

// const storage = multer.diskStorage({

//     destination: function (req, file, cb) {
//         cb(null, './uploads')
//     },
//     filename: function (req, file, cb) {
//         console.log("FILE ORGINAL NAME: " + file.originalname)
//         const formatedName = file.originalname.split(' ').join('_')
//         fileName = new Date().toISOString().replace(/:/gi, '-') + '_' + formatedName
//         // cb(null, `${fileName}.apk`) - Dla produkcji - wymuszanie APK

//         cb(null, `${fileName}`)

//     }
// })

// const upload = multer({
//     limits: { fileSize: maxSize },
//     storage,
//     fileFilter: function (req, file, cb) {
//         var filetypes = /png|avi|apk/;
//         // console.log(file)
//         var mimetype = filetypes.test(file.fieldname);
//         // var extname = filetypes.test(path.extname(
//         //     file.originalname).toLowerCase());
//         console.log("mimetype: " + mimetype)
//         // console.log("extname: " + extname)

//         if (mimetype == false) {
//             // console.log("Błąd, akceptowane formaty plików: /apk|avi|png/")
//             res.status(200).send("Błąd, akceptowane formaty plików: /apk|avi|png/")
//             console.log("Forbidden extension")
//             req.fileValidationError = "Forbidden extension";
//             return cb(null, false, req.fileValidationError);

//             // return cb(null, true);
//         }
//         // req.filenewname = extname
//         cb(null, true);

//     }
// })

// ----------------------------------------------------------------------------
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, './uploads'))
    }, 
    filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + file.originalname.match(/\..*$/)[0])
    }
});

const multi_upload = multer({
    storage,
    limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            const err = new Error('Only .png, .jpg and .jpeg format allowed!')
            err.name = 'ExtensionError'
            return cb(err);
        }
    },
}).array('uploadedImages', 2)

router.post('/sendFile', multi_upload, (req, res) => {
    console.log("Someone sen me files ! :D")
    multi_upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            res.status(500).send({ error: { message: `Multer uploading error: ${err.message}` } }).end();
            return;
        } else if (err) {
            // An unknown error occurred when uploading.
            if (err.name == 'ExtensionError') {
                res.status(413).send({ error: { message: err.message } }).end();
            } else {
                res.status(500).send({ error: { message: `unknown uploading error: ${err.message}` } }).end();
            }
            return;
        }

        // Everything went fine.
        // show file `req.files`
        // show body `req.body`
        res.status(200).end('Your files uploaded.');
    })
});


router.get('/', (req, res) => {
    console.log("save/save")
    res.status(200).send("Jesteś w /save")
})


module.exports = router
