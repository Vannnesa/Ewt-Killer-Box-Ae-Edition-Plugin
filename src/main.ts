import $ from "jquery";
import { LogSystem } from './pojo/logsystem';
import {UserInfoInterface} from "./dao/UserInfoDao";
import {getUserToken} from "./utils/token";
import {getMenuBtn} from "./utils/jquery_component";
import {
    isInCoursePage, isInHolidayFrame,
    isInTaskPage,
    isOnPractisePage,
    leftComponent,
    NoPage,
    Notice,
    renderBackground,
    renderWindow,
    renderWindowMenu
} from "./utils/window";

import {SGM_getValue, SGM_info, SGM_setValue} from "./utils/function";
import {HomeworkView} from "./views/homework_view";
import {donate_img, input_key_img, log_img, open_img, order_svg, setting_img, statisticsbtn_img, update_svg} from "./utils/resources";
import {getUrlInfo, request, requestJson} from "./utils/request";
import { TaskView } from "./views/TaskView";
import {CourseView} from "./views/course_view";
import {LogView} from "./views/log_view";
import {log_style, update_info_style} from "./utils/style_manager";

import {User} from "@/pojo/user";
import {dict} from "@/type";
import {ActivateView} from "@/views/activate_view";
import config from "./config";
import { headers } from "./utils/constants";
import { getLatestVersion } from "./dao/Misc_dao";
import { CheckUpdateView } from "./views/update_view";
import { PurchaseHistoryView } from "./views/purchase_history_view";
import { SceneTaskView } from "./views/SceneTaskView";

export let {version} = SGM_info.script

export let user:User;
let closewidow_timeout:NodeJS.Timeout[] = []

async function openBox() {
    renderBackground();
    let attr = getUrlInfo()
    if(isOnPractisePage()) {
        // @ts-ignore
        renderWindow(leftComponent(user),await (new HomeworkView(
            attr["paperId"],
            attr["bizCode"],
            attr["platform"],
            attr["homeworkId"]
        )).surfaceComponent(),true)
    } else if(isInTaskPage()) {
        renderWindow(leftComponent(user),await (new TaskView()
            .build(attr["homeworkId"])).surfaceComponent(),true)
    } else if(isInCoursePage()) {
        renderWindow(leftComponent(user),await (
            await (new CourseView()).build() //oh gosh!!!!!!!!
        ).surfaceComponent(),true)
    } else if(isInHolidayFrame()) {
        renderWindow(leftComponent(user),await (
            await (new SceneTaskView()).build(attr["sceneId"]) //oh gosh!!!!!!!!
        ).surfaceComponent(),true)
    } else {
        renderWindow(leftComponent(user),NoPage(),true)
    }
}


async function getUser(): Promise<User> {
    let userInterface = new UserInfoInterface();
    let dat1 = await userInterface.getSchoolInfo()
    let dat0:dict = await userInterface.getBasicUserInfo();
    let apidat:dict = await userInterface.getApiUserInfo()

    if(dat0 != null && dat1 != null) {
        return {
            id: dat0["userId"],
            name:dat0["realName"],
            photoUrl: dat0["photoUrl"],
            token: getUserToken(),
            school: dat1.schoolId,
            isvip: apidat["isvip"],
            opcount: apidat["opcount"],
        }
    } else {
        return {
            id: undefined,
            name:undefined,
            photoUrl: undefined,
            token: undefined,
            school: undefined,
            isvip: false
        }
    }
}

export async function updateUserInfo() {
    user = await getUser();
}

export function addCloseWindowTimeout(fn:(...args: any) => void,delay:number) {
    let t:NodeJS.Timeout = setTimeout(fn,delay)
    closewidow_timeout.push(t)
}

export function clearAllCloseWindowTimeout() {
    closewidow_timeout.forEach((t) => {
        clearTimeout(t)
    })
}

async function openUpdateAndVersionBox() {
    let {vcode,update_log,version,location} = await getLatestVersion();
    console.log(vcode)
    if(config.version < vcode) {
        renderBackground();
        renderWindow(undefined,await new CheckUpdateView(update_log,location,version).surfaceComponent(),true)
    } else if(await SGM_getValue(`kewt.ver.${config.version}`)== undefined) {
        let root = $(`<div class="${update_info_style.updateLContainer}"></div>`)
        
        root.append(update_svg)
        root.append($(`<div class="${update_info_style.updateLNewVerText}">更新日志</div>`))
        let cont = $(`<div class="${update_info_style.updateLNewVerDetailContainer}"></div>`)
        cont.html(update_log)

        root.append(cont)
        renderBackground();
        renderWindow(undefined,root,true)
        SGM_setValue(`kewt.ver.${config.version}`,1)
    }
}

let open = getMenuBtn("red",$(open_img),"打开工具箱",async ()=>{
    await openBox()
})


let logbtn = getMenuBtn("green",$(log_img),"程序日志记录",async ()=>{
    if(user.id != null) {
        renderBackground()
        renderWindow(undefined,<JQuery<HTMLElement>>((new LogView()).surfaceComponent()),true)
        let c = <Element>document.querySelector(`.${log_style.logTableContainer}`)
        c.scrollTop = c.scrollHeight
    } else {
        document.location.href = "https://web.ewt360.com/register/#/login"
    }

})

let osvg_btn = $(order_svg);
osvg_btn.css("height","20px")
osvg_btn.css("width","20px")
let orderhistorybtn= getMenuBtn("yellow",$(osvg_btn),"付款历史记录",async ()=>{
    renderBackground()
    renderWindow(undefined,await new PurchaseHistoryView().surfaceComponent(),true)
})

export let log:LogSystem;
$(async ()=>{
    log = await new LogSystem().build();
    await updateUserInfo();
    await openUpdateAndVersionBox();

    open.addClass("default-open-btn")
    let ikbtn = getMenuBtn("purple",$(input_key_img),"激活",async ()=>{
        let s = new ActivateView().surfaceComponent()
        renderBackground()
        if(user.id == undefined) {
            document.location.href = "https://web.ewt360.com/register/#/login"
        } else {
            renderWindow(undefined,s,true,undefined,"padding: 0")
        }
    })
    
    renderWindowMenu([open,ikbtn,orderhistorybtn,logbtn]);


})