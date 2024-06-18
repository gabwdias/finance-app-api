import validator from 'validator';
import { badRequest } from './http.js';

export const checkIfIdIsValid = (id) => validator.isUUID(id);

export const invalidIdResponse = () =>
    badRequest({
        message: 'The provided ID is not valid',
    });

export const checkIfString = (value) => typeof value === 'string';

export const validateRequiredFields = (params, requiredFields) => {
    for (const field of requiredFields) {
        const fieldIsMissing = !params[field];
        const fieldIsEmpty =
            checkIfString(params[field]) &&
            validator.isEmpty(params[field], {
                ignore_whitespace: true,
            });

        if (fieldIsMissing || fieldIsEmpty) {
            return {
                missingField: field,
                ok: false,
            };
        }
    }
    return {
        ok: true,
        missingField: undefined,
    };
};
