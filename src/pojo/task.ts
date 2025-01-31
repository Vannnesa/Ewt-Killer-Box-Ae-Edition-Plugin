export class Task {
    homeworkTitle: string; //作业标题
    startDate: number; //开始日期
    endDate: number; //结束日期
    homeworkIds: Array<number> //作业id
    teachers: Array<string> //老师


    constructor(homeworkTitle: string, startDate: number, endDate: number, homeworkIds: Array<number>, teachers: Array<string>) {
        this.homeworkTitle = homeworkTitle;
        this.startDate = startDate;
        this.endDate = endDate;
        this.homeworkIds = homeworkIds;
        this.teachers = teachers;
    }
}