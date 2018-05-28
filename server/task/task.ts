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
    get Description() { return this.description; };
    get Head() { return this.head; };
    get Id() { return this.id; };
}