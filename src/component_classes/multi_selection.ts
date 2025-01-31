import {multiselection_style} from "../utils/style_manager";
import {multiView, viewOption, viewOptionClicked} from "../css/multiselection.css";
import {windowMain} from "../css/index.css";

export class MultiSelectionComponent {
    private page : {[key:string] : {
        container: JQuery<HTMLElement>,
        clickable: Function, //返回值为Boolean,意味着是否可以执行切换操作
        onclick:Function
        }} //页数Dictionary
    private menu : JQuery<HTMLElement>; //菜单栏

    private root : JQuery<HTMLElement>

    private selected_element: JQuery<HTMLElement>; //选中的page对应的按钮
    private selected_content : JQuery<HTMLElement>

    public constructor(views:{[key:string] : {
            container: JQuery<HTMLElement>,
            clickable: Function,
            onclick:Function
        }},css: {[key:string]:string}) {
        this.menu = $(`<div class='${multiselection_style.viewOptions}'></div>`); //菜单栏实例化
        this.page = views

        this.root = $(`<div class='${multiselection_style.multiViewBox}'></div>`)
        this.selected_element = $()
        this.selected_content = $(`<div class='${multiView}'></div>`)

        let first = true;
        for(let c in views) {
            let option = $(`<div class='${multiselection_style.viewOption}'><label>${c}</label></div>`) //选项按钮
            option.on('click', async () => {
                if (await this.page[c].clickable()) {
                    this.changePage(option, c)
                }
            })
            if (first) {
                this.changePage(option, c)
                first = false
            } //确保是第一个元素
            this.menu.append(option)
        }

        this.root.append(this.menu)
        this.root.append(this.selected_content)


        for(let i in css) {
            this.selected_content.css(i,css[i])
        }
    }

    public addPage(key:string,page:JQuery<HTMLElement>,click: Function) {
        this.page[key].container = page
        this.page[key].clickable = click
    }

    /**
     * 将各个Components组装成一个完整的组件
     */
    public getPage() {
        return this.root
    }

    private changePage(menuElement:JQuery<HTMLElement>,key:string) {
        let ori_c = this.selected_element.text()
        if(key==ori_c) return
        if(ori_c.length!= 0) {
            this.selected_element.removeClass(`${viewOptionClicked}`)
            this.selected_element.addClass(`${viewOption}`)
            this.page[ori_c].container = this.selected_content.children(":first-child").clone(true,true) //保存更改后的element
        }

        menuElement.addClass(`${viewOptionClicked}`)
        menuElement.removeClass(`${viewOption}`)

        this.selected_content.empty()
        this.selected_content.append(this.page[key].container) //不重新赋值，不能让变量根指针改变
        this.page[key].onclick()
        this.selected_element = menuElement
    }
}