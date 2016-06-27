var express = require('express');
var router = express.Router();
var request = require("request");
var cors=require('cors');
router.use(cors());




var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/zomato');

/* GET api listing. */
router.get('/mcd', cors(), function(req, res, next) {

    var mycollection = db.get('orders');
    mycollection.find({"restaurant" : "McDonalds","status":"pending"}, function (e, docs) {
        res.json(docs);
    });
});

router.get('/kfc', cors(), function(req, res, next) {

    var mycollection = db.get('orders');
    mycollection.find({"restaurant" : "KFC","status":"pending"}, function (e, docs) {
        res.json(docs);
    });
});

router.get('/dominos', cors(), function(req, res, next) {

    var mycollection = db.get('orders');
    mycollection.find({"restaurant" : "Dominos","status":"pending"}, function (e, docs) {
        res.json(docs);
    });
});


router.get('/rider', cors(), function(req, res, next) {

    var mycollection = db.get('orders');
    mycollection.find({"status":"placed"}, function (e, docs) {
        res.json(docs);
    });
});

//McDonalds
router.get('/mcdPlaced', cors(), function(req, res, next) {

    var mycollection = db.get('orders');
    mycollection.find({"restaurant" : "McDonalds","status":"placed"}, function (e, docs) {
        res.json(docs);
    });
});
router.post('/mcdReject',cors(),function(req,res,next){
    var mycollection = db.get('orders');
    var arr = Object.keys(req.body);
    var id=JSON.parse(arr[0])._id;

    mycollection.update({"_id":id},{$set: {"status":"rejected"}});
    res.end();
});

router.post('/mcdAccept',cors(),function(req,res,next){
    var mycollection = db.get('orders');
    console.log("Hello from the other side");
    var arr = Object.keys(req.body);
    var id=JSON.parse(arr[0])._id;

    mycollection.update({"_id":id},{$set: {"status":"placed"}});
    res.end();
});

//kfc
router.get('/kfcPlaced', cors(), function(req, res, next) {

    var mycollection = db.get('orders');
    mycollection.find({"restaurant" : "KFC","status":"placed"}, function (e, docs) {
        res.json(docs);
    });
});
router.post('/kfcReject',cors(),function(req,res,next){
    var mycollection = db.get('orders');
    var arr = Object.keys(req.body);
    var id=JSON.parse(arr[0])._id;

    mycollection.update({"_id":id},{$set: {"status":"rejected"}});
    res.end();
});

router.post('/kfcAccept',cors(),function(req,res,next){
    var mycollection = db.get('orders');
    console.log("Hello from the other side");
    var arr = Object.keys(req.body);
    var id=JSON.parse(arr[0])._id;

    mycollection.update({"_id":id},{$set: {"status":"placed"}});
    res.end();
});

//dominos
router.get('/dominosPlaced', cors(), function(req, res, next) {

    var mycollection = db.get('orders');
    mycollection.find({"restaurant" : "Dominos","status":"placed"}, function (e, docs) {
        res.json(docs);
    });
});
router.post('/dominosReject',cors(),function(req,res,next){
    var mycollection = db.get('orders');
    console.log("Hello from the reject side");
    var arr = Object.keys(req.body);
    var id=JSON.parse(arr[0])._id;

    mycollection.update({"_id":id},{$set: {"status":"rejected"}});
    res.end();
});

router.post('/dominosAccept',cors(),function(req,res,next){
    var mycollection = db.get('orders');
    console.log("Hello from the other side");
    var arr = Object.keys(req.body);
    var id=JSON.parse(arr[0])._id;

    mycollection.update({"_id":id},{$set: {"status":"placed"}});
    res.end();
});

router.post('/delivered',cors(),function(req,res,next){
    var mycollection = db.get('orders');
    var arr = Object.keys(req.body);
    var id=JSON.parse(arr[0])._id;

    mycollection.update({"_id":id},{$set: {"status":"delivered"}});
    res.end();
});
module.exports = router;
