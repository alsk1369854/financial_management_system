export interface ErrorResponseInterface {
    [key: string]: any;
    timestamp: string;
    status: number;
    error: string;
    path: string;
}