import {FinishCourseService} from "../services/FinishCourseService";
import {FinishCourseAbstractService} from "../services/FinishCourseAbstractService";
import {errorResult, normalResult} from "../pojo/result";
import {UUID} from "../utils/stringutil";
import {CourseDao} from "../dao/jmpcls_dao";
import {data} from "autoprefixer";
import {TaskCourse} from "../pojo/course";
import { dict } from "@/type";

export abstract class IFinishCourseController {
    protected courseDao: CourseDao;

    protected constructor() {
        this.courseDao = new CourseDao();
    }
    abstract addCourse(courseid:string,lessonid:string,ratio?:number):void;
    abstract emptyCourse():void
    abstract FinishCourse() : Promise<dict>

}

export class FinishCourseController extends IFinishCourseController {
    courses: FinishCourseAbstractService[]

    private task_id: string

    constructor() {
        super()
        this.courses=[]
        this.emptyCourse()
        this.task_id = ""
    }

    addCourse(courseid:string,lessonid:string,homeworkid:number,ratio?:number): void {
        let serv:FinishCourseAbstractService = new FinishCourseService(
            lessonid,
            courseid,
            homeworkid,
            this.courseDao,
            ratio
        )
        this.courses.push(serv)
    }

    emptyCourse() {
        this.courses=[]
    }

    async FinishCourse() : Promise<dict> {
        let data:Array<TaskCourse> = []
        for(let i of this.courses) {
            data.push(await i.getCourseInfo())
        }
        let ret:dict = await this.courseDao.FinishCourseFn(
            data
        )
        if(ret['code'] == 200) {
            this.task_id = ret["data"]["tid"]
        }
        return ret
    }

    async GetTask() {
        let dat = await this.courseDao.GetTaskFn(this.task_id)
        return dat
    }
}