const Note=require('../models/Notes')
const mongoose=require('mongoose')

exports.home = async (req, res) => {
  


  
    const locals = {
      title: "NOTES APP",
      description: "Free NodeJS Notes App.",
    }

    try{
        const notes=await Note.find({});
        res.render('dashboard/index', {
          userName:req.res.firstname,
          locals:locals,
          notes:notes,
          layout: '../views/layouts/dashboard'
        });
    }
    catch(err){
      console.error(err);
      res.status(500).send('Server Error');

    }
    
  }
  

  //get note using id
  exports.dashboardViewNote=async (req,res)=>{
   
    const note = await Note.findById({ _id: req.params.id })
    .where({ user: req.user.id })
    .lean();

  if (note) {
    res.render("dashboard/view-notes", {
      noteID: req.params.id,
      note,
      layout: "../views/layouts/dashboard",
    });
  } else {
    res.send("Something went wrong.");
  }
  };

  //update note
  exports.dashboardUpdateNote=async (req,res)=>{
    try {
      await Note.findOneAndUpdate(
        { _id: req.params.id },
        { title: req.body.title, body: req.body.body, updatedAt: Date.now() }
      ).where({ user: req.user.id });
      res.redirect("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }

  //del
  exports.dashboardDeleteNote = async (req, res) => {
    try {
      await Note.deleteOne({ _id: req.params.id }).where({ user: req.user.id });
      res.redirect("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  //add
  exports.dashboardAddNote = async (req, res) => {
    res.render("dashboard/add", {
      layout: "../views/layouts/dashboard",
    });
  };

  //submit
  exports.dashboardSubmitNote = async (req, res) => {
    try {
      req.body.user = req.user.id;
      await Note.create(req.body);
      res.redirect("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };