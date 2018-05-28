export class Task {
    private name: string;
    private head: string;
    private id: number;
    constructor(name: string, head: string, id: number) {
        this.name = name;
        this.head = head;
        this.id = id;
    }
    get Name() { return this.name; };
    get Head() { return this.head; };
    get Id() { return this.id; };
}