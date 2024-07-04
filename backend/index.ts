import express from "express";
import cors from "cors";
import { z } from "zod";
import {v4} from 'uuid'

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
const greetings = [];
let greetingId = 0;

let userId = 0;
const users = [];

const uuids = [];
class Greeting {
  id: string;
  greeting: string;
  constructor(id: string, greeting: string) {
    this.id = id;
    this.greeting = greeting;
  }
}

const userSchema = z.object({
  username: z.string(),
  email: z.string().email('Invalid e-mail format'),
  password: z.string(),
  birthday: z.string().date()
});

app.get("/status", (req, res) => {
  res.sendStatus(200);
});

app.get("/api/v1/greetings", (req, res) => {
  res.json(greetings);
});

app.post("/api/v1/greetings", (req, res) => {
  console.log(req.body);
  greetingId++;
  const greeting = new Greeting(greetingId.toString(), req.body.greeting);
  greetings.push(greeting);
});

app.get("/api/v1/greetings/:id", (req, res) => {
  const id = req.params.id;
  const greetingWithId = greetings.find((greeting) => greeting.id === id);
  res.send(greetingWithId);
});

app.delete("/api/v1/greetings/:id", (req, res) => {
  const id = req.params.id;
  const index = greetings.findIndex((greeting) => greeting.id === id);
  if (index !== -1) {
    const deletedGreeting = greetings.splice(index, 1);
    res.json(deletedGreeting[0]);
  } else {
    res.status(404).send({ error: "Greeting not found" });
  }
});

app.post("/api/v1/users", (req, res) => {
  
  userId++;
  const parsedUser = userSchema.parse(req.body);
  
  const parsedUserWithId = { id:userId, ...parsedUser, role:["guest"] };
  console.log(req.body);
  users.push(parsedUserWithId);
  res.json(users);
});

app.post("/auth/login", (req, res) => {
  const user = users.find((user) => 
    user.email == req.body.email && user.password == req.body.password)

  const newId = v4().replaceAll('-', '');
  uuids.push(newId);

  console.log(user);
  res.json(newId)
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
