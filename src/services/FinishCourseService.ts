import { FinishCourseAbstractService } from "./FinishCourseAbstractService";
import { user } from "../main";
import {TaskCourse} from "../pojo/course";
import {CourseDao} from "../dao/jmpcls_dao";


export class FinishCourseService extends FinishCourseAbstractService {
    lessonid: string;
    courseid: string;
    homeworkid: string;
    courseDao: CourseDao
    ratio?: number;

    constructor(lessonid:string|number,
                courseid:string|number,
                homeworkid:string|number,
                courseDao: CourseDao,
                ratio?:number,
                ) {
        super()
        this.lessonid=lessonid.toString()
        this.courseid=courseid.toString()
        this.homeworkid=homeworkid.toString()
        this.courseDao = courseDao
        this.ratio=ratio
    }

    async getCourseInfo(): Promise<TaskCourse> {
        let res!:TaskCourse;
        if(user.school != undefined) {
             res = <TaskCourse>(await this.courseDao.getCourseInfo(
                this.lessonid,
                user.school,
                this.homeworkid
            ))
            res.homeworkId = parseInt(this.homeworkid)
            let c:Array<{studyTest:{paperId:string}}> = await this.courseDao.getPlayerLesson([this.lessonid],this.homeworkid,parseInt(user.school))
            res.studyTest=[]
            for(let i of c) {
                res.studyTest.push(i.studyTest)
            }

        }
        return res
    }


}

