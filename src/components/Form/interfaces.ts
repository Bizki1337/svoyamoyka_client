export interface Options {
    value: number;
    label: string;
    isFixed?: boolean;
    isDisabled?: boolean;
}

export interface Istate {
    id: number;
    client_name: string;
    client_last_name: string;
    client_phone: string;
    client_email: string;
    number_of_persons: string;
    date: Date;
    booked_time: number;
    tables: number[]; 
}
