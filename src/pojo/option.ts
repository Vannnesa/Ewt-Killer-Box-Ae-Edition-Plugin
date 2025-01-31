import index from "../css/index.css";

export interface IQuestion  {
    description: JQuery<HTMLElement> | string,
    id: string | number,
    questionNo: number,
    questionContent: string,
    cateName: string,
    myAnswer: Array<Object>,
    childQuestions: Array<IQuestion>,
    analyse: string,
    rightAnswer: Array<string>,
    options: Array<Option>,
    cate: number,
    score? : number
}

export class Option {
    choice: string
    index: number
    option: string

    constructor(choice: string, index: number, option: string) {
        this.choice = choice;
        this.index = index;
        this.option = option;
    }
}
export class OptionQuestion implements IQuestion {
    options: Option[]
    description: string | JQuery<HTMLElement>
    id: string | number
    questionNo: number
    cateName: string
    questionContent: string
    myAnswer: object[]
    rightAnswer: string[]
    analyse: string
    cate: number
    childQuestions: Array<IQuestion>;
    public constructor(optionGroup:Option[],
        description: string | JQuery<HTMLElement>,
        questionId: string | number,
        cateId: string | number,
        cateName: string,
        questionContent: string,
        myAnswer: Array<Object>,
        rightAnswer: string[],
        childQuestions:IQuestion[],
        analyse: string,
        cate: number) {
            this.options = optionGroup
            this.id = questionId
            this.description = description
            this.questionNo =<number>cateId
            this.cateName = cateName
        this.questionContent =questionContent
        this.rightAnswer = rightAnswer
        this.myAnswer = myAnswer
        this.childQuestions = childQuestions
        this.analyse = analyse
        this.cate = cate
    }

    
}