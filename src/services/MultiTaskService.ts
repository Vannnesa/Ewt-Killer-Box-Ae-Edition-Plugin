export abstract class MultiTaskService<T>
    implements Iterator<T> {
    private elements : T[]

    public constructor(elements?:T[]) {
        if(elements) this.elements=elements
        else this.elements=[]
    }
    next(): IteratorResult<T, any> {
        throw new Error("Method not implemented.");
    }
}