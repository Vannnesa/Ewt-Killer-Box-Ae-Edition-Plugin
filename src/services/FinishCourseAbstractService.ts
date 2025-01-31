import { CourseDao } from "../dao/jmpcls_dao";
import {CommonCourse} from "../pojo/jmpcls_objects";
import {TaskCourse} from "../pojo/course";

export abstract class FinishCourseAbstractService {


    abstract getCourseInfo() : Promise<TaskCourse>;

}