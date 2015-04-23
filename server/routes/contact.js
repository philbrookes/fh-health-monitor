var router = require("express").Router();
var express = require("express");
var models = require("../../data/mongoose/allModel");
var bodyParser = require("body-parser");
var ObjectId = require("mongoose").Types.ObjectId;
router.use(bodyParser.urlencoded());
router.use(bodyParser.json());
router.get("/",function(req,res){
  var ContactModel=models["Contact"];
  var con=req.query;
  var limit=100;
  var offset=0;
  if (con.limit){
    limit=con.limit;
    delete con.limit;
  }
  if (con.offset){
    offset=con.offset;
    delete con.offset;
  }
  ContactModel.find(con,{response:0,checkObj:0},{sort:{startDate:-1}}).limit(limit).skip(offset).exec(function(err,models){
    if (err){
      res.status(500).json({err:err.toString()});
    }else{
      res.json(models);
    }
  });
});
router.get("/:contactid",function(req,res){
  var ContactModel=models["Contact"];
  var contactId=req.params.contactid;
  ContactModel.findById(new ObjectId(contactId),function(err,doc){
    if (err){
      res.status(500).json({err:err.toString()});
    }else{
      res.json(doc);
    }
  });
});


//create a check
router.post("/", function(req, res) {
  var ContactModel = models["Contact"];
  var model = new ContactModel(req.body);
  model.save(function(err, m) {
    if (err) {
      res.status(500).json({
        err: err
      });
    } else {
      res.json({
        "_id": m._id
      });
    }
  });
});
//delete a check
router.delete("/:id", function(req, res) {
  var id = req.params.id;
  var ContactModel = models["Contact"];
  ContactModel.findById(new ObjectId(id), function(err, doc) {
    if (err) {
      res.status(500).json({
        err: err
      });
    } else {
      doc.remove(function(err) {
        if (err) {
          res.status(500).json({
            err: err
          });
        } else {
          res.json(doc);
        }
      })
    }
  })
});

//edit a check
router.put("/:id",function(req,res){
  var id=req.params.id;
  var ContactModel=models["Contact"];
  delete req.body._id;
  ContactModel.findByIdAndUpdate(new Object(id),req.body,function(err,doc){
    if (err){
      res.status(500).json({err:err});
    }else{
      res.json(doc);
    }
  });
});


module.exports=router;
