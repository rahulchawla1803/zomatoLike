var express = require('express');
var router = express.Router();
var request = require("request");

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/zomato');
var cors=require('cors');
router.use(cors());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.get('/home', function(req, res, next) {
  res.render('home');
});
router.get('/order', function(req, res, next) {
  res.render('order');
});

router.get('/orderSubmit', function (req, res) {

    var usID = parseInt(req.query.usID);
    var mycollection = db.get('users');
    mycollection.find({"id": usID}, function(e, docs) {
        var count = docs[0].address.length;

        res.render('final', {
            doc: docs,
            count: count,
            restName: req.query.rest,
            order: req.query.order
        });
    });
 /*
  //console.log(JSON.stringify(response));
  //console.log(JSON.parse(response));
  //res.end(JSON.stringify(response));
*/
});

router.get('/address', function(req, res, next) {
  
   var usID = parseInt(req.query.usID);

   var mycollection = db.get('users');
   mycollection.find({"id": usID},function(e, docs){
       if(docs.length==0){
         count=0;
       }
       else{
         var count = docs[0].address.length;}
       res.render('address', {
         doc: docs,
         count: count
       });

  /*
   console.log(docs);
   console.log(docs.length);
   res.render('check');
   */
});
});

router.get('/addAddr', function(req, res, next) {
    var address = req.query.address;
    var usID = parseInt(req.query.usID);
    var usname = req.query.usname;

    var mycollection = db.get('users');

    mycollection.find({"id": usID}, function (e, document) {
        if (document.length == 0) {
            mycollection.insert({"id": usID, "name": usname, "address": [address]});
        }
        else {
            mycollection.update({"id": usID}, {$push: {"address": address}});
        }
    });
    res.render('home');

    });

router.get('/waiting', function(req, res, next) {
    var date=new Date();
    var min=date.getMinutes();
    var hours=date.getHours();
    var time=hours+":"+min;
   
    var mycollection = db.get('orders');
    mycollection.insert({"order":req.query.orderPlaced,
        "restaurant":req.query.restName,
        "address":req.query.addrSel,
        "time": time,
        "status":"pending"
    });
   res.render('waiting'); 
});

router.get('/orderStatus', function(req, res, next) {
    var mycollection = db.get('orders');
    mycollection.find({}, function (e, docs) {
        res.render('orderStatus',{
            docs:docs
        });    
    });
    
});

module.exports = router;
