export class Member {
    private name: string;
    private id: number;

    get Name() { return this.name; }
    get Id() { return this.id; }

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}