export enum RfIdStatus {
    Start = 'start',
    End = 'end',
    Error = 'error',
}

export interface RfIdInfo {
    uid: string;
    status: RfIdStatus;
}
