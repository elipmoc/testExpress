import { Task } from "./task";

export class TaskCount {
    total_tasks_num: number = 0;
    new_tasks_num: number = 0;
    inprogress_tasks_num: number = 0;
    resolved_tasks_num: number = 0;
    finished_tasks_num: number = 0;
    dismissed_tasks_num: number = 0;

    constructor(tasks: Task[]) {
        for (const task of tasks) {
            this.total_tasks_num++;
            switch (task.State) {
                case "new":
                    this.new_tasks_num++;
                    break;
                case "inprogress":
                    this.inprogress_tasks_num++;
                    break;
                case "resolved":
                    this.resolved_tasks_num++;
                    break;
                case "finished":
                    this.finished_tasks_num++;
                    break;
                case "dismissed":
                    this.dismissed_tasks_num++;
                    break;
            }
        }
    }
}