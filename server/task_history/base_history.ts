import * as moment from "moment";


export abstract class BaseHistory {
    private time_stamp: string;

    //履歴の表示
    abstract show(): string;

    //時刻付き履歴の表示
    show_with_time() {
        return `${this.show()}:${this.time_stamp}`
    }
    constructor() {
        this.time_stamp = moment().format();
    }

}