import {IPaper, IPaperInfo, Paper} from "../pojo/fih_objects"
import { resultImpl } from "../pojo/result"
import {IQuestion} from "../pojo/option";

export interface IHomeworkService {
    paperid: string,
    bizcode: string,
    homeworkId: number,
    reportId?: string,
    getPaper(): Promise<Paper | number>
    getPaperInfo(): Promise<IPaperInfo>
    getPaperAVL(): Promise<boolean>
    getSelfPaper(): Promise<Paper | number>
}