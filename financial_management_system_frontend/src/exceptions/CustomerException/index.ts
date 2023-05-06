export class CustomerIdNullException extends Error {
    constructor(){
        super("customer id can't be null");
    }
}