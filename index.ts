import cors from "cors";
import express, { Application, Request, Response } from "express";
import { nanoid } from "nanoid";
import fs from "node:fs";

const app: Application = express();
const port = 3000;

// const cors = require("cors");

// const tasks = [
//   { id: "10154", name: "Mop the floor" },
//   { id: "15740", name: "Wipe out dust" },
// ];

app.use(cors());
app.use(express.json());

function getTasks() {
  const data = fs.readFileSync("data.txt", "utf8");
  const tasks = JSON.parse(data);
  return tasks;
}

function writeTasks(tasks: { id: string; name: string; isCompleted: boolean }) {
  fs.writeFile("data.txt", JSON.stringify(tasks), (err) => {
    if (err) {
      console.error(err);
    }
  });
}

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World! 123 ---ABC");
});

app.get("/tasks", (req: Request, res: Response) => {
  const { status } = req.query;
  const tasks = getTasks();
  const filteredTasks = tasks.filter((task: { isCompleted: boolean }) => {
    if (status === "All") {
      return true;
    } else if (status === "Active") {
      return !task.isCompleted;
    } else {
      return task.isCompleted;
    }
  });
  res.send(filteredTasks);
});

app.post("/tasks", (req: Request, res: Response) => {
  const id = nanoid();
  const { name } = req.body;

  if (!name) {
    res.status(400).send({ message: "name is required" });
    return;
  }

  const tasks = getTasks();
  tasks.unshift({ id, name, isCompleted: false });
  writeTasks(tasks);

  res.status(201).send({ id });
});

app.delete("/tasks/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const tasks = getTasks();
  const newTasks = tasks.filter((task: { id: string }) => task.id !== id);
  writeTasks(newTasks);
  res.sendStatus(204);
});

app.put("/tasks/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const { name } = req.body;
  const tasks = getTasks();

  const index = tasks.findIndex((task: { id: string }) => task.id === id);
  if (index === -1) {
    res.status(404).send({ message: "Task not found" });
    return;
  }

  tasks[index].name = name;
  writeTasks(tasks);

  res.sendStatus(204);
});

app.patch("/tasks/:id/check", (req: Request, res: Response) => {
  const id = req.params.id;

  const tasks = getTasks();

  const index = tasks.findIndex((task: { id: string }) => task.id === id);
  if (index === -1) {
    res.status(404).send({ message: "Task not found" });
    return;
  }

  tasks[index].isCompleted = !tasks[index].isCompleted;
  writeTasks(tasks);

  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
