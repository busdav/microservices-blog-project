const express = require("express");
// crypto module is a built-in module of Node, so no need add any package
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json({ extended: false }));
// cors allows us to send axios requests from the client hosted at port 3000 to here (4000)
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts/create", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  // destructuring assignment syntax - equivalent to `const title = req.body.title`
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  await axios.post("http://event-bus-srv:4005/events", {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Event Received:", req.body.type);

  res.send({});
});

app.listen(4000, () => {
  console.log('v1001');
  console.log("Listening on 4000");
});
