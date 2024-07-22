const mongoose = require("mongoose");

(async function getDB() {
  const res = await mongoose.connect(
    "mongodb+srv://prajjwal:prajjwal@cluster0.qade2nc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  console.log("DB connected");
})();

require("./employee.model");
