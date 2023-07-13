export interface Idata {
    id: number,
    date: string,
    todo: string[],
    done: string[]
}

export interface IAddTodo{
    date: string,
    todo: string
}