

export interface PhoneType {
    [pcomp: string]: {
        models: Array<PhoneInfo>,
        os:string,
        os_version: string
    }
}

interface PhoneInfo {
    name: String,
    resolution: String
}

interface ILesson {
    [key: string]: any
    videoPlayTime: number
    lessonName:string
    teacherName:string
    subjectName:string
    studyTest?: Array<{
        paperId:string
    }>
}

export class CommonCourse implements ILesson{
    [key: string]: any
    videoPlayTime: number
    lessonName:string
    teacherName:string
    subjectName:string
    studyTest: Array<{
        paperId:string
    }>


    constructor(videoPlayTime: number, lessonName: string, teacherName: string, subjectName: string, studyTest?: Array<{
        paperId: string
    }>) {
        this.videoPlayTime = videoPlayTime;
        this.lessonName = lessonName;
        this.teacherName = teacherName;
        this.subjectName = subjectName;

        this.studyTest=[]
        if(studyTest!= undefined)
            this.studyTest=studyTest
    }
}
