export interface States {
    [key: string]: string;
}

export function getStates(): States {
    return {
        "new": "新規",
        "inprogress": "進行中",
        "resolved": "解決",
        "finished": "終了",
        "dismissed": "却下"
    };
}

export class Task {
    private name: string;
    private head: string;
    private id: number;
    private description: string;
    private state: string;
    constructor(name: string, head: string, description: string, id: number, state: string) {
        this.name = name;
        this.head = head;
        this.description = description;
        this.id = id;
        this.state = state;
    }
    get Name() { return this.name; };
    set Name(x) { this.name = x; };
    get Description() { return this.description; };
    set Description(x) { this.description = x; };
    get Head() { return this.head; };
    set Head(x) { this.head = x; };
    get Id() { return this.id; };
    set Id(x) { this.id = x; };
    get State() { return this.state; }
    get StateName() { return getStates()[this.state]; }
    set State(x) { this.state = x; }
}