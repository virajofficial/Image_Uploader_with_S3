const route = require('express').Router();
const controller = require('../controllers/controller');
const multer = require('multer')
const path = require('path');
const bp = require('body-parser')

const { uploadFile, removeFiles, isSuccess } = require('../database/s3');

var image_Urls;
var files;
var picker_Value;

const storage = multer.diskStorage({
    destination: '../../app/uploads',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}_${file.originalname.split(".")[0]}${path.extname(file.originalname)}`)
    }
})

var upload = multer({
    storage: storage,
})


route.get('/', controller.home)

var urlencodedParser = bp.urlencoded({ extended: false })

route.post('/uploadImages',urlencodedParser, upload.array('images',10),async (req, res)=>{
    files = req.files;
    picker_Value = req.body.selectpicker;
    console.log(req.body.selectpicker);
    var isS = await uploadFile(files)

    const urls = req.files.map(file=>{
        return `https://realitiscoutvirtualour.s3.ap-southeast-1.amazonaws.com/${file.filename}`
    })
    image_Urls = urls;
    
    console.log('submited successfully');
    if(isS)
        res.redirect('https://360virtualtour.netlify.app/');
})


route.get('/getImage', (req, res) =>{
    console.log(res);
    controller.getImages(req,res,image_Urls,picker_Value);
    console.log(res);
})

route.get('/removeImages',async (req, res)=>{
    await removeFiles(files)
    res.redirect('/')
});


module.exports = route;