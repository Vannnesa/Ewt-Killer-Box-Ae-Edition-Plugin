export interface User {
    name: string | undefined,
    id: string | undefined,
    photoUrl: string | undefined,
    token: string | undefined,
    school: string | undefined,
    isvip: boolean
    opcount?: number,
    expire_time?: number
}
