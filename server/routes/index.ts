import * as express from 'express';
var router = express.Router();
import { Task, getStates } from "../task/task";
import { Response, Request } from "express";
import { BaseHistory } from '../task_history/base_history';
import { CreateHistory, DeleteHistory, UpdateHistory } from '../task_history/histories';

let tasks: Task[] = new Array();
let task_histories: BaseHistory[] = new Array();
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
  tasks.push(new Task(name, head, description, current_id, 'new'));

  task_histories.push(new CreateHistory(name));
  current_id++;
  res.redirect('tasks');
});

router.delete('/task/:id', function (req: Request, res: Response, next: any) {
  const id = req.params["id"];
  const delete_task = tasks.find(x => x.Id == id);
  if (delete_task) {
    task_histories.push(new DeleteHistory(delete_task.Name));
    tasks = tasks.filter(x => x.Id != id);
  }
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
  res.render('edit', { task: task, states: getStates() });
});

router.put('/task/:id', function (req: Request, res: Response, next: any) {
  const id = req.params["id"];
  const name = req.body["task[name]"];
  const state = req.body["task[state]"];
  const head = req.body["task[head]"];
  const description = req.body["task[description]"];
  let task = tasks.find(x => x.Id == id);
  if (task) {
    task_histories.push(new UpdateHistory(new Task(task.Name, task.Head, task.Description, task.Id, task.State), new Task(name, head, description, id, state)));
    task.Head = head;
    task.Name = name;
    task.State = state;
    task.Description = description;
  }
  res.redirect(`/task/${id}`);
});

router.get('/task_history', function (req: any, res: any, next: any) {
  res.render('task_history', { task_histories: task_histories.slice().reverse() });
});

router.get('/howto', function (req: any, res: any, next: any) {
  res.render('howto');
});

module.exports = router;
