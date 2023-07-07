const express = require("express");
const serverless = require("serverless-http");
const app = express();
const Student = require("../models/student");

// Create a new student
app.post("/", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).send(student);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all students
app.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.send(students);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a specific student by ID
app.get("/:id", async (req, res) => {
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
app.patch("/:id", async (req, res) => {
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
app.delete("/:id", async (req, res) => {
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

module.exports = app;
module.exports.handler = serverless(app);
