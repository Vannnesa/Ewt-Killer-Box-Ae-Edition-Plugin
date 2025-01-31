export let headers:{[key:string]:{
    [key:string]:any
}} = {
    CommonHeader: {
        "Origin": "https://web.ewt360.com",
        "Referer": "https://web.ewt360.com/mystudy/",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 Edg/121.0.0.0",
        "Ewt-Requestsource":"web",
        "Ewt-Contentstyle":"CamelCase"
    },
    CourseHeader: {
        "Origin": "https://teacher.ewt360.com",
        "Referer": "https://teacher.ewt360.com/",
        "Referurl" : "https://teacher.ewt360.com/ewtbend/bend/index/index.html#/homework/play-videos",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 Edg/121.0.0.0",
        "Ewt-Requestsource":"web",
        "Ewt-Contentstyle":"CamelCase"
    }
}

export let coursetagsreflection = {
    "课程讲": {
        "lessonid": "lessonId",
        "courseid": "courseId",
        "videoType": 1
    },
    "校本视频": {
        "lessonid": "id",
        "courseid": "",
        "videoType": 6
    }
}

