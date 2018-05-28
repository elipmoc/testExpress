import * as express from 'express';
var router = express.Router();
import { Task } from "../task/task";
import { Response, Request } from "express";

let tasks: Task[] = new Array();
let current_id: number = 0;

/* GET home page. */
router.get('/', function (req: any, res: any, next: any) {
  res.render('index', { title: 'Express' });
});

router.get('/tasks', function (req: any, res: any, next: any) {
  res.render('tasks', { tasks: tasks });
});

router.get('/task', function (req: any, res: any, next: any) {
  res.render('new');
});

router.post('/task', function (req: Request, res: Response, next: any) {
  const name = req.body["task[name]"];
  const head = req.body["task[head]"];
  const description = req.body["task[description]"];
  tasks.push(new Task(name, head, description, current_id));
  current_id++;
  res.redirect('tasks');
});

router.delete('/task/:id', function (req: Request, res: Response, next: any) {
  const id = req.params["id"];
  tasks = tasks.filter(x => x.Id != id);
  res.redirect('/tasks');
});

router.get('/task/:id', function (req: any, res: any, next: any) {
  const id = req.params["id"];
  const task = tasks.find(x => x.Id == id);
  res.render('task', { task: task });
});

router.get('/task/edit/:id', function (req: any, res: any, next: any) {
  const id = req.params["id"];
  const task = tasks.find(x => x.Id == id);
  res.render('edit', { task: task });
});

router.put('/task/:id', function (req: Request, res: Response, next: any) {
  const id = req.params["id"];
  const name = req.body["task[name]"];
  const head = req.body["task[head]"];
  const description = req.body["task[description]"];
  let task = tasks.find(x => x.Id == id);
  if (task) {
    task.Head = head;
    task.Name = name;
    task.Description = description;
  }
  res.redirect(`/task/${id}`);
});

module.exports = router;
