

import {Paper} from "./fih_objects";

/**
 * HOMEWORK_TASKS_URL:见ms_dao.ts
 * ewt HOMEWORK_TASKS_URL接口返回的在课程列表中的course实例
 */
export interface TaskCourse {
    title: string; //标题
    contentUrl: string; //课程/试卷对应的URL
    duration: number; //时间
    contentTypeName: contentTypeName; //课程类型(参见contentTypeName)
    subjectName: string; //学科
    homeworkId: number; //homeworkid
    contentId: string; //courseId
    imgUrl:string;
    id:string;//lessonId
    teacherName?: string
    videoPlayTime?: number
    studyTest?: Array<{
        paperId:string
    }>
    ratio?: number; //完成度(OPT)
    reportId?: string; //汇报id
}

export enum contentTypeName {
    SubjectCourse = "课程讲",
    SchoolCourse = "校本视频",
    Paper = "试卷",
}