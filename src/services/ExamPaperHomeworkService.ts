import { resultImpl } from "../pojo/result"
import { IHomeworkService } from "./IHomeworkService"
import { HomeworkDao } from "../dao/fih_homerwork_dao"
import {IPaper, IPaperInfo, Paper} from "../pojo/fih_objects";

export class ExamPaperHomeworkService implements IHomeworkService {
    homeworkDao:HomeworkDao;
    paperid:string;
    bizcode: string;
    reportId: string;
    platform: string;
    homeworkId: number

    public constructor(paperid:string,bizcode:string,platform:string,homeworkId:number) {
        this.bizcode=bizcode
        this.platform=platform
        this.paperid=paperid
        this.reportId=""
        this.homeworkDao = new HomeworkDao()
        this.homeworkId=homeworkId
    }
    async getPaperAVL(): Promise<boolean> {
        let r:any = await this.homeworkDao.GetPaperActivate(this.paperid)
        return <boolean>(r["data"])
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

    async getPaper(): Promise<Paper | number> {
        let obj:any =  await this.homeworkDao.getPaper(this.paperid,this.bizcode,this.homeworkId)

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

}