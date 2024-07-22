const express = require("express");
var router = express.Router();
const Employee = require("../models/employee.model");

router.get("/", (req, res) => {
  res.render("employee/addOrEdit", {
    viewTitle: "Insert Employee",
  });
});

router.post("/", async (req, res) => {
  if (req.body._id == "") InsertRecord(req, res);
  else {
    await UpdateRecord(req, res);
    res.redirect("employee/list");
  }
});

router.get("/list", async (req, res) => {
  const list = await Employee.find().lean();
  res.render("employee/list", { list });
});

router.get("/:id", async (req, res) => {
  const doc = await Employee.findById(req.params.id).lean();
  res.render("employee/addOrEdit", {
    viewTitle: "Update Employee",
    employee: doc,
  });
});

router.get("/delete/:id", async (req, res) => {
  await Employee.findOneAndDelete(req.params.id);
  res.redirect("/employee/list");
});

async function InsertRecord(req, res) {
  var employee = new Employee();
  employee.fullName = req.body.fullName;
  employee.email = req.body.email;
  employee.mobile = req.body.mobile;
  employee.city = req.body.city;

  await employee.save();
  res.redirect("employee/list");
}

async function UpdateRecord(req, res) {
  await Employee.findByIdAndUpdate({ _id: req.body._id }, req.body);
}

module.exports = router;
