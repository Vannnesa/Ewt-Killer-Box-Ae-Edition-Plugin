// ==UserScript==
// @match        *://*/*
// @run-at       document-end
// ==/UserScript==

import $ from "jquery";
import { LogSystem } from './pojo/logsystem';
import { UserInfoInterface } from "./dao/UserInfoDao";
import { getUserToken } from "./utils/token";
import { getMenuBtn } from "./utils/jquery_component";
import {
    isInCoursePage, isInHolidayFrame,
    isInTaskPage,
    isOnPractisePage,
    leftComponent,
    NoPage,
    renderBackground,
    renderWindow,
    renderWindowMenu
} from "./utils/window";

import { SGM_getValue, SGM_info, SGM_setValue } from "./utils/function";
import { HomeworkView } from "./views/homework_view";
import { donate_img, input_key_img, log_img, open_img, order_svg, setting_img, statisticsbtn_img, update_svg } from "./utils/resources";
import { getUrlInfo, request, requestJson } from "./utils/request";
import { TaskView } from "./views/TaskView";
import { CourseView } from "./views/course_view";
import { LogView } from "./views/log_view";
import { log_style, update_info_style } from "./utils/style_manager";

import { User } from "@/pojo/user";
import { dict } from "@/type";
import { ActivateView } from "@/views/activate_view";
import config from "./config";
import { headers } from "./utils/constants";
import { getLatestVersion } from "./dao/Misc_dao";
import { CheckUpdateView } from "./views/update_view";
import { PurchaseHistoryView } from "./views/purchase_history_view";
import { SceneTaskView } from "./views/SceneTaskView";

export let { version } = SGM_info.script;

export let user: User;
let closeWindowTimeout: NodeJS.Timeout[] = [];

async function openBox() {
    renderBackground();
    let attr = getUrlInfo();

    let viewComponent: Promise<JQuery<HTMLElement>>;
    if (isOnPractisePage()) {
        viewComponent = new HomeworkView(attr["paperId"], attr["bizCode"], attr["platform"], attr["homeworkId"]).surfaceComponent();
    } else if (isInTaskPage()) {
        // 假设 build 方法返回的是同步 TaskView 实例
        const taskView = new TaskView().build(attr["homeworkId"]);
        viewComponent = Promise.resolve(taskView.surfaceComponent());
    } else if (isInCoursePage()) {
        const courseView = new CourseView().build();
        viewComponent = Promise.resolve(courseView.surfaceComponent());
    } else if (isInHolidayFrame()) {
        const sceneTaskView = new SceneTaskView().build(attr["sceneId"]);
        viewComponent = Promise.resolve(sceneTaskView.surfaceComponent());
    } else {
        viewComponent = Promise.resolve(NoPage());
    }

    renderWindow(leftComponent(user), await viewComponent, true);
}

async function getUser(): Promise<User> {
    const userInterface = new UserInfoInterface();
    // 转换为 any 类型，确保可以用索引访问
    const dat1: any = await userInterface.getSchoolInfo();
    const dat0: any = await userInterface.getBasicUserInfo();
    const apidat: any = await userInterface.getApiUserInfo();

    if (dat0 != null && dat1 != null) {
        return {
            id: dat0["userId"],
            name: dat0["realName"],
            photoUrl: dat0["photoUrl"],
            token: getUserToken(),
            school: dat1.schoolId,
            isvip: apidat["isvip"],
            opcount: apidat["opcount"],
        };
    } else {
        return {
            id: undefined,
            name: undefined,
            photoUrl: undefined,
            token: undefined,
            school: undefined,
            isvip: false
        };
    }
}

export async function updateUserInfo() {
    if (!user) {
        user = await getUser();
    }
}

export function addCloseWindowTimeout(fn: (...args: any) => void, delay: number) {
    closeWindowTimeout.push(setTimeout(fn, delay));
}

export function clearAllCloseWindowTimeout() {
    closeWindowTimeout.forEach(clearTimeout);
    closeWindowTimeout.length = 0;
}

async function openUpdateAndVersionBox() {
    let { vcode, update_log, version, location } = await getLatestVersion();
    console.log(vcode);
    if (config.version < vcode) {
        renderBackground();
        renderWindow(undefined, await new CheckUpdateView(update_log, location, version).surfaceComponent(), true);
    } else if (await SGM_getValue(`kewt.ver.${config.version}`) === undefined) {
        let root = $(`<div class="${update_info_style.updateLContainer}"></div>`);
        root.append(update_svg, $(`<div class="${update_info_style.updateLNewVerText}">更新日志</div>`));
        let cont = $(`<div class="${update_info_style.updateLNewVerDetailContainer}"></div>`).html(update_log);
        root.append(cont);
        renderBackground();
        renderWindow(undefined, root, true);
        SGM_setValue(`kewt.ver.${config.version}`, 1);
    }
}

// —— 使用事件委托优化 ——
// 调用 getMenuBtn 时，不直接绑定 click 事件，而是为按钮添加统一的 CSS 类及 data 保存动作
let open = getMenuBtn("red", $(open_img), "打开工具箱", null);
open.addClass("tm-menu-btn").data("action", async () => { await openBox(); });

let logbtn = getMenuBtn("green", $(log_img), "程序日志记录", null);
logbtn.addClass("tm-menu-btn").data("action", async () => {
    if (user?.id) {
        renderBackground();
        renderWindow(undefined, (<JQuery<HTMLElement>>((new LogView()).surfaceComponent())), true);
        const c = document.querySelector(`.${log_style.logTableContainer}`) as Element;
        if (c) c.scrollTop = c.scrollHeight;
    } else {
        document.location.href = "https://web.ewt360.com/register/#/login";
    }
});

let orderHistoryBtn = getMenuBtn("yellow", $(order_svg).css({ height: "20px", width: "20px" }), "付款历史记录", null);
orderHistoryBtn.addClass("tm-menu-btn").data("action", async () => {
    renderBackground();
    renderWindow(undefined, await new PurchaseHistoryView().surfaceComponent(), true);
});

export let log: LogSystem;
$(async () => {
    [log, user] = await Promise.all([
        new LogSystem().build(),
        getUser()
    ]);
    await openUpdateAndVersionBox();

    open.addClass("default-open-btn");

    let ikbtn = getMenuBtn("purple", $(input_key_img), "激活", null);
    ikbtn.addClass("tm-menu-btn").data("action", async () => {
        if (!user?.id) {
            document.location.href = "https://web.ewt360.com/register/#/login";
        } else {
            renderBackground();
            renderWindow(undefined, new ActivateView().surfaceComponent(), true, undefined, "padding: 0");
        }
    });
    
    renderWindowMenu([open, ikbtn, orderHistoryBtn, logbtn]);
});

// 委托事件：所有带有 .tm-menu-btn 类的按钮点击时均调用 data 中保存的 action
$(document).on("click", ".tm-menu-btn", function(e) {
    const action = $(this).data("action");
    if (typeof action === "function") {
        action.call(this, e);
    }
});
