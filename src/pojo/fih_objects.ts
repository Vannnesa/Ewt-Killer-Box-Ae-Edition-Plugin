import {IQuestion} from "./option";

export interface Answer {
    answers:Array<Number | string>,
    questionId:string,
    questionNo: number,
    totalSeconds: number,
    cateId: number,
    attachmentImages?: [],
    score?: number
}

export interface IPaperCoreInfo {
    paperid:number|string,
    bizcode:number|string,
    platform: number,
    homeworkid?: number
}

export interface IPaper {
    title: string,
    questions: Array<IQuestion>,
    paperId: string,
    reportId: string,
    [key:string] : any
}

export interface ISubmitPaperObject {
    paperId: string,
    platform: string,
    reportId: string,
    totalSeconds: number,
    bizCode: string,
    homeworkId?: string
}
export interface IPaperInfo {
    paperId: string,
    reportId: string,
    [key:string] : any
}

export class OptionAnswerPayload implements Answer{
    answers: (string | Number)[]
    questionId: string
    questionNo: number
    totalSeconds: number
    cateId: number
    constructor(answers: (string | Number)[], questionId: string, questionNo: number, totalSeconds: number, cateId: number) {
        this.answers = answers;
        this.questionId = questionId;
        this.questionNo = questionNo;
        this.totalSeconds = totalSeconds;
        this.cateId = cateId;
    }
}

export class NotOptionAnswerPayload implements Answer {
    answers: Array<Number | string>;
    attachmentImages: [];
    cateId: number;
    questionId: string;
    questionNo: number;
    score?: number;
    revision:boolean;
    totalSeconds: number;

    constructor(answers: Array<Number | string>, attachmentImages: [], cateId: number, questionId: string, questionNo: number, totalSeconds: number,score?: number) {
        this.answers = answers;
        this.attachmentImages = attachmentImages;
        this.cateId = cateId;
        this.questionId = questionId;
        this.questionNo = questionNo;
        this.score = score;
        this.totalSeconds = totalSeconds;
        this.revision=true
    }
}

export class Paper implements IPaper {
    private _title: string
    private _questions: IQuestion[]
    private _paperId: string;
    private _reportId: string;

    constructor(title: string, ques: Array<IQuestion>,paperid: string,reportid: string) {
        this._title = title
        this._questions = ques
        this._paperId = paperid
        this._reportId = reportid
    }
    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get questions(): IQuestion[] {
        return this._questions;
    }

    get paperId(): string {
        return this._paperId;
    }

    set paperId(value: string) {
        this._paperId = value;
    }

    get reportId(): string {
        return this._reportId;
    }

    set reportId(value: string) {
        this._reportId = value;
    }

    [key: string]: any

    add(obj: IQuestion) {
        this._questions.push(obj)
    }


}
export class SubmitPaperObject implements ISubmitPaperObject {
    bizCode: string;
    paperId: string;
    platform: string;
    reportId: string;
    totalSeconds: number;

    constructor(bizCode: string, paperId: string, platform: string, reportId: string, totalSeconds: number) {
        this.bizCode = bizCode;
        this.paperId = paperId;
        this.platform = platform;
        this.reportId = reportId;
        this.totalSeconds = totalSeconds;
    }
}

export class PaperCoreInfo implements IPaperCoreInfo {
    bizcode: number | string;
    homeworkid?: number;
    paperid: number | string;
    platform: number;

    constructor(bizcode: number | string, homeworkid: number, paperid: number | string, platform: number) {
        this.bizcode = bizcode;
        this.homeworkid = homeworkid;
        this.paperid = paperid;
        this.platform = platform;
    }
}