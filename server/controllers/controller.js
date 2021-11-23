
const http = require('http');
const fs = require('fs');


exports.home = function(req, res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile('./views/index.html', null, function(error, data){
        if(error){
            res.writeHead(404);
        }
        else{
            res.write(data);
        }
        res.end();
    });

}

exports.getImages = function(req, res, imgUrls, picker_val){
    res.send({
        message: "success", 
        urls: imgUrls,
        picker_value: picker_val
    })
    console.log("picker value", picker_val)
}

exports.getSelectValue = function(req, res){

}