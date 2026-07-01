import express from "express";
import mongoose from "mongoose";
import Grades from "../models/grades.js";


const router = express.Router();

// Create a single grade entry
router.post("/", async (req, res) => {
  const result = await Grades.create(req.body);
  res.send(result)
});

// Get a single grade entry

  router.get("/:id", async (req, res) => {

  const result= await Grades.findById({_id:req.params.id})
  if(!result)
    res.send("No Object with that id...").status(404)
  else res.json(result)

});

// Add a score to a grade entry
   
router.patch("/:id/add", async (req, res) => {
  

  const result = await Grades.findByIdAndUpdate(req.params.id,{$push:{scores:req.body}},{returnDocument:"after"})
  res.json(result)




});

// Remove a score from a grade entry
    
   router.patch("/:id/remove", async (req, res) => {
  const result = await Grades.findByIdAndUpdate(
      req.params.id,
      { $pop: { scores: 1 } },
      { returnDocument: "after" },
    );
    res.json(result)


  });

  
// Delete a single grade entry

router.delete("/:id", async (req, res) => {
  const result = await Grades.findByIdAndDelete(
        req.params.id);
      res.json(result);

});

// Get route for backwards compatibility

router.get("/student/:id", async (req, res) => {
  res.redirect(`../../grades/${req.params.id}`);
});

// Get a learner's grade data

router.get("/learner/:id", async (req, res) => {
  let result = await Grades.find({student_id:Number(req.params.id)}).limit(10)
  if(result.length === 0 ){
    res.send("No data with that student id...").status(404);
  }
  else res.json(result)
  

});

// Delete a learner's grade data

router.delete("/learner/:id", async (req, res) => {
  let result = await Grades.deleteMany({ student_id: Number(req.params.id) })
  res.json(result);

});

// Get a class's grade data

 router.get("/class/:id", async (req, res) => {
  let result = await Grades.find({ class_id: Number(req.params.id) }).limit(
    10,
  );
  if (result.length === 0) {
    res.send("No data with that class id...").status(404);
  } else res.json(result);

});

// Update a class id
router.patch("/class/:id", async (req, res) => {
  let result = await Grades.findByIdAndUpdate(
    req.params.id,
    { $set: { class_id: req.body.class_id } },
    { returnDocument: "after" },
  );
  res.json(result)

  });

// Delete a class
router.delete("/class/:id", async (req, res) => {
  let result = await Grades.deleteMany({class_id:req.params.id})
  if (result.length === 0) {
    res.send("No data with that class id...").status(404);
  } else res.json(result);

});

export default router;
