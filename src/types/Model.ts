export interface Model {
    id: number;
    creation_date: string;
    data_parameters: DataParameters;
    file_solution_text: string;
    last_edit: string | null;
    name: string;
    parameters: Parameters;
    user_id: number;
    solution_path_file: string;
    solution: Array<Array<Array<number>>>;
}

export interface DataParameters {
    capacity: Array<number>;
    xcords: Array<number>;
    ycords: Array<number>;
}

export interface Parameters {
    gap: number;
    time_limit: number;
    vehicle_max_capacity: number;
}
