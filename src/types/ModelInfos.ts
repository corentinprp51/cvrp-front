export interface ModelInfos {
    name: string
    parameters: Parameters
    data: DataInput
    needEmail: boolean
}

export interface Parameters {
    gap: number;
    time_limit?: number;
    iterations_limit?: number;
    vehicle_max_capacity?: number;
}
export interface DataInput {
    xcords: Array<number>;
    ycords: Array<number>
    capacity: Array<number>
}

export interface ModelExisting {
    id: string;
    parameters: Parameters;
    data: DataInput;
}
