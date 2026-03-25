const express = require("express");
const app = express();

// middleware
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

/* other API routes */
app.get("/api/students", (req, res) => {
  res.send("Student API working");
});

/* React build serving (if you added step 1) */
const path = require("path");
app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
