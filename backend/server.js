const express = require("express");
const { exec } = require("child_process");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import the CORS middleware
const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(bodyParser.json());

app.post("/spellcheck", (req, res) => {
  const text = req.body.text; // Get the plain text from the request

  // Execute the JAR file, passing the text as an argument
  exec(`java -jar spellcheck.jar "${text}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing JAR: ${error}`);
      return res.status(500).send("Error executing spellcheck.");
    }

    // Return the output from the JAR file
    res.send(stdout);
  });
});

// Start the server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
