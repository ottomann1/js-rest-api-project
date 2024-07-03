import express from "express";
const app = express();
const port = 3000;



let greetings = [];

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
  res.json(greetings)
}), 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
