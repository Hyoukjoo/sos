export enum E_addActionType {
    ADD_SCHEDULE_REQUEST = 'ADD_SCHEDULE_REQUEST',
    ADD_SCHEDULE_SUCCESS = 'ADD_SCHEDULE_SUCCESS',
    ADD_SCHEDULE_FAILURE = 'ADD_SCHEDULE_FAILURE'
}

export interface ISchedule {
    title: string;
    images: string;
    start_time: string;
    end_time: string;
    location?: string;
    privacyBounds: string;
    hashs?: string;
}

export interface IaddScheduleActionTypes {
    type: typeof E_addActionType.ADD_SCHEDULE_REQUEST;
    data: ISchedule;
}
