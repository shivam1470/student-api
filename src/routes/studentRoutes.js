const express = require("express");
const router = express.Router();
const Student = require("../models/student");

// Create a new student
router.post("/", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).send(student);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.send(students);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a specific student by ID
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).send({ message: "Student not found" });
    }
    res.send(student);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a student
router.patch("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!student) {
      return res.status(404).send({ message: "Student not found" });
    }
    res.send(student);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a student
router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).send({ message: "Student not found" });
    }
    res.send(student);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
