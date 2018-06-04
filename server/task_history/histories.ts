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
        let before_task_name = "";
        let after_task_name = "";
        let before_task_head = "";
        let after_task_head = "";
        let before_task_description = "";
        let after_task_description = "";
        let before_task_state = "";
        let after_task_state = "";
        if (this.before_task.Name != this.after_task.Name) {
            before_task_name = `タスク名:${this.before_task.Name}`;
            after_task_name = `タスク名:${this.after_task.Name}`;
        }
        if (this.before_task.Head != this.after_task.Head) {
            before_task_head = `見出し:${this.before_task.Head}`;
            after_task_head = `見出し:${this.after_task.Head}`;
        }
        if (this.before_task.Description != this.after_task.Description) {
            before_task_description = `説明:${this.before_task.Description}`;
            after_task_description = `説明:${this.after_task.Description}`;
        }
        if (this.before_task.State != this.after_task.State) {
            before_task_state = `状況:${this.before_task.State}`;
            after_task_state = `状況:${this.after_task.State}`;
        }
        return `{${before_task_name},${before_task_head},${before_task_description},${before_task_state}}を{${after_task_name},${after_task_head},${after_task_description},${after_task_state}}に更新`;
    }
}