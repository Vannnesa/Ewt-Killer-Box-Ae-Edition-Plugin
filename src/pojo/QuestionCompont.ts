export class QuestionComponentDesc {
    comp: JQuery<HTMLElement>
    index: string
    parentComp?: JQuery<HTMLElement>

    public constructor(comp:JQuery<HTMLElement>,index:string,parent?:JQuery<HTMLElement>) {
        this.comp = comp
        this.parentComp = parent
        this.index = index
    }
}