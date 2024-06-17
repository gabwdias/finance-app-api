export class EmailAlreadyInUseError extends Error {
    constructor(email) {
        super(`The email ${email} is already in use`);
        this.name = 'EmailAlreadyInUse';
    }
}

export class UserNotFoundError extends Error {
    constructor(userId) {
        super(`No User with ID ${userId} was found`);
        this.name = 'UserNotFoundError';
    }
}
