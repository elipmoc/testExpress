import { BaseHistory } from "../task_history/base_history";
import { Task } from "../task/task";

export class CreateHistory extends BaseHistory {
    private task_name: string;
    constructor(task_name: string) {
        super();
        this.task_name = task_name;
    }
    show() {
        return `${this.task_name}を作成`;
    }
}

export class DeleteHistory extends BaseHistory {
    private task_name: string;
    constructor(task_name: string) {
        super();
        this.task_name = task_name;
    }
    show() {
        return `${this.task_name}を削除`;
    }
}

export class UpdateHistory extends BaseHistory {
    private before_task: Task;
    private after_task: Task;
    constructor(before_task: Task, after_task: Task) {
        super();
        this.before_task = before_task;
        this.after_task = after_task;
    }
    show() {
        let str = "";
        if (this.before_task.Name != this.after_task.Name) {
            str += `{タスク名:${this.before_task.Name}→${this.after_task.Name}}`;
        }
        if (this.before_task.Head != this.after_task.Head) {
            str += `{見出し:${this.before_task.Head}→${this.after_task.Head}}`;
        }
        if (this.before_task.Description != this.after_task.Description) {
            str += `{説明:${this.before_task.Description}→${this.after_task.Description}}`;
        }
        if (this.before_task.State != this.after_task.State) {
            str += `{状況:${this.before_task.State}→${this.after_task.State}}`;
        }
        return `${str}に更新`;
    }
}