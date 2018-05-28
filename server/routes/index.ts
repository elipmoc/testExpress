var express = require('express');
var router = express.Router();
import { Task } from "../task/task";

/* GET home page. */
router.get('/', function (req: any, res: any, next: any) {
  res.render('index', { title: 'Express' });
});

router.get('/tasks', function (req: any, res: any, next: any) {
  res.render('tasks', { tasks: [new Task("fuga", "poge", 114)] });
});


module.exports = router;
