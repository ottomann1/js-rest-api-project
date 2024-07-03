import express from "express";
import cors from "cors";
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
let greetings = [];
let id = 0;

class Greeting {
  id: string;
  greeting: string;
  constructor(id: string, greeting: string) {
    this.id = id;
    this.greeting = greeting;
  }
}

app.get("/status", (req, res) => {
  res.sendStatus(200);
});

app.get("/api/v1/greetings", (req, res) => {
  res.json(greetings);
});

app.post("/api/v1/greetings", (req, res) => {
  console.log(req.body);
  id++;
  const greeting = new Greeting(id.toString(), req.body.greeting);
  greetings.push(greeting);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
