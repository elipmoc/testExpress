import * as express from 'express';
var router = express.Router();
import { Task, getStates } from "../task/task";
import { Response, Request } from "express";
import { BaseHistory } from '../task_history/base_history';
import { CreateHistory, DeleteHistory, UpdateHistory } from '../task_history/histories';
import { TaskCount } from '../task/task_count';
import { Member } from '../member/member';

let tasks: Task[] = new Array();
let task_histories: BaseHistory[] = new Array();
let current_id: number = 0;
let current_member_id: number = 0;
let members: Member[] = new Array();

/* GET home page. */
router.get('/', function (req: any, res: any, next: any) {
  res.render('index', { title: 'Express' });
});

router.get('/tasks', function (req: any, res: any, next: any) {
  res.render('tasks', { tasks: tasks, tasks_count: new TaskCount(tasks) });
});

router.get('/task', function (req: any, res: any, next: any) {
  res.render('new', { members: members });
});

router.post('/task', function (req: Request, res: Response, next: any) {
  const name = req.body["task[name]"];
  const head = req.body["task[head]"];
  const description = req.body["task[description]"];
  const memberId = req.body["task[memberId]"];
  tasks.push(new Task(name, head, description, current_id, 'new', memberId));

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
  if (task == undefined) {
    return;
  }
  res.render('task', { task: task, member: members.find(m => m.Id == task.MemberId) });
});

router.get('/task/edit/:id', function (req: any, res: any, next: any) {
  const id = req.params["id"];
  const task = tasks.find(x => x.Id == id);
  res.render('edit', { task: task, states: getStates(), members: members });
});

router.put('/task/:id', function (req: Request, res: Response, next: any) {
  const id = req.params["id"];
  const name = req.body["task[name]"];
  const state = req.body["task[state]"];
  const head = req.body["task[head]"];
  const description = req.body["task[description]"];
  const memberId = req.body["task[memberId]"];
  let task = tasks.find(x => x.Id == id);
  if (task) {
    task_histories.push(new UpdateHistory(new Task(task.Name, task.Head, task.Description, task.Id, task.State, task.MemberId), new Task(name, head, description, id, state, memberId), members));
    task.Head = head;
    task.Name = name;
    task.State = state;
    task.Description = description;
    task.MemberId = memberId;
  }
  res.redirect("/tasks");
});

router.get('/task_history', function (req: any, res: any, next: any) {
  res.render('task_history', { task_histories: task_histories.slice().reverse() });
});

router.get('/howto', function (req: any, res: any, next: any) {
  res.render('howto');
});

router.get('/members', function (req: any, res: any, next: any) {
  res.render('member/index', { members: members });
});

router.get('/member', function (req: any, res: any, next: any) {
  res.render('member/new');
});

router.post('/member', function (req: Request, res: Response, next: any) {
  const name = req.body["member[name]"];
  members.push(new Member(current_member_id, name));
  current_member_id++;
  res.redirect('members');
});

module.exports = router;
