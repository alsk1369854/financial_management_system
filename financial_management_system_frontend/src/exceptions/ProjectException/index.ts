export class ProjectIdNullException extends Error {
    constructor() {
        super("Project id can't be null");
    }
}