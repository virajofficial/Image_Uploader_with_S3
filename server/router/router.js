const route = require('express').Router();
const controller = require('../controllers/controller');
const multer = require('multer')
const path = require('path');

const { uploadFile, removeFiles } = require('../database/s3');

var image_Urls;
var files;

const storage = multer.diskStorage({
    destination: '../app/uploads',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}_${file.originalname.split(".")[0]}${path.extname(file.originalname)}`)
    }
})

var upload = multer({
    storage: storage,
})


route.get('/', controller.home)

route.post('/uploadImages', upload.array('images'), async (req, res)=>{
    files = req.files;
    await uploadFile(files)

    const urls = req.files.map(file=>{
        return `https://realitiscoutvirtualour.s3.ap-southeast-1.amazonaws.com/${file.filename}`
    })
    image_Urls = urls;

    console.log('submited successfully');
    res.redirect('https://360virtualtour.netlify.app/');
})


route.get('/getImage', (req, res) =>{
    console.log(req);
    controller.getImages(req,res,image_Urls);
})

route.get('/removeImages',async (req, res)=>{
    await removeFiles(files)
    res.redirect('/')
});


module.exports = route;