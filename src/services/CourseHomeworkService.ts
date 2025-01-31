import {IHomeworkService} from "./IHomeworkService";
import {IPaper, IPaperInfo, Paper} from "../pojo/fih_objects";
import {HomeworkDao} from "../dao/fih_homerwork_dao";
import {user} from "../main";
import { dict } from "@/type";

export class CourseHomeworkService implements IHomeworkService {
    bizcode: string;
    paperid: string;
    platform:string
    reportId: string
    homeworkId:number;

    homeworkDao: HomeworkDao

    constructor() {
        this.homeworkDao = new HomeworkDao()
        this.paperid=""
        this.bizcode="204"
        this.reportId=""
        this.homeworkId=-1
        this.platform="1"
        //bizcode恒为204和platform恒为1的原因:
        //见ewt 35.bundle.f7c739d1.js:
        //window.open("".concat(y.web, "/mystudy/#/exam/answer/?paperId=").concat(n.paperId, "&bizCode=204&platform=1&isRepeat=1")))
    }
    async getPaperAVL(): Promise<boolean> {
        let r:any = await this.homeworkDao.GetPaperActivate(this.paperid)
        return <boolean>(r["data"])
    }

    async build(homeworkId:number,lessonid:number) {
        this.homeworkId=homeworkId
        let paper:Array<{studyTest:{paperId:string}}>
        this.reportId = ""
        if(user.school != undefined) {
            paper =await this.homeworkDao.getPlayerLesson([lessonid.toString()],this.homeworkId,parseInt(user.school))
            if(paper[0]==undefined) return undefined
            this.paperid=paper[0]["studyTest"]["paperId"]
        }
        await this.getPaperInfo();
        return this
    }

    buildWithPaperId(paperid:string) {
        this.paperid=paperid
        return this
    }

    async getPaper(): Promise<Paper | number> {
        let obj =  await this.homeworkDao.getPaper(this.paperid,this.bizcode,this.homeworkId)
        if(obj["code"] != 200) {
            return obj["code"]
        }
        return new Paper(obj["data"]["title"],
            obj["data"]["questions"],
            obj["data"]["paperId"],
            obj["data"]["reportId"])
    }

    async getPaperInfo(): Promise<IPaperInfo> {
        let obj = <IPaperInfo>(await this.homeworkDao.getHomeworkInfo(this.paperid,this.bizcode))
        let res : {
            paperId: string,
            reportId: string
        } = obj
        this.reportId = res.reportId
        return res
    }
    async getSelfPaper(): Promise<Paper | number> {
        let obj:any =  await this.homeworkDao.getSelfPaper(this.paperid,this.reportId,this.bizcode);
        if(obj!=null) {
            return new Paper(obj["title"],
                obj["questions"],
                obj["paperId"],
                obj["reportId"])
        } else {
            return -1
        }

    }
}