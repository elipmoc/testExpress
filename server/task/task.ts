export class Task {
    private name: string;
    private head: string;
    private id: number;
    private description: string;
    constructor(name: string, head: string, description: string, id: number) {
        this.name = name;
        this.head = head;
        this.description = description;
        this.id = id;
    }
    get Name() { return this.name; };
    set Name(x) { this.name = x; };
    get Description() { return this.description; };
    set Description(x) { this.description = x; };
    get Head() { return this.head; };
    set Head(x) { this.head = x; };
    get Id() { return this.id; };
    set Id(x) { this.id = x; };
}