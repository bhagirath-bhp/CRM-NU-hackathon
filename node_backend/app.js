const express = require("express");
const bodyParser = require("body-parser"); 
const { spawn } = require('child_process');

const app = express();
const fs = require("fs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => { 
    res.sendFile(`${__dirname}/public/index.html`);
});

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

app.get("/chatBot", (request, response) => { // Reading Python files
    var dataToSend;
    const python = spawn('python', ["./chatBot.py",request.query.qna]);
    // collect data from script
    python.stdout.on('data', function (data) { 
        console.log("hii")
        dataToSend = data.toString();
    });
    python.stderr.on('data', data => { 
        console.error(`stderr: ${data}`);
    });
    // in close event we are sure that stream from child process is closed 
    python.on('exit', (code) => {
    console.log(`child process exited with code ${code}, ${dataToSend}`); 
    // response.sendFile(`${___dirname}/public/result.html`);
    response.json({ message: dataToSend });
    });
});


var listener = app.listen(3400, () => {
    console.log(`Your app is listening on port ${listener.address().port}`);
});