class ValidationError extends Error {
    constructor(name, message) {
        super(message);
        this.name = name || 'ValidationError'
    }
}

module.exports = { ValidationError }