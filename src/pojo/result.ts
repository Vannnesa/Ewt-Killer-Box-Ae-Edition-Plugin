interface result {
    code:number,
    progress?: number,
    message: string,
    data?: string
}

export class resultImpl implements result {
    code: number;
    progress?: number | undefined;
    message: string;
    data?: string | undefined;
    
    constructor(code:number,message:string,progress?:number|undefined,data?:string) {
        this.code = code
        this.progress = progress
        this.message = message
        this.data = data
    }
}

export class progressResult extends resultImpl {
    constructor(code:number,progress:number,message:string) {
        super(code,message,progress)
    }
}

export class errorResult extends resultImpl  {
    constructor(code:number,message: string) {
        super(code,message)
    }
}

export class normalResult extends resultImpl {
    constructor(code:number,message:string) {
        super(code,message,undefined,undefined)
    }
}