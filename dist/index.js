"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Handler which takes a promise and resolves with array signature `[err, results]`.
 * @generics <errorType, dataType> Type of the error and data
 * @param  {Promise} promise    Promise to handle
 * @param  {Object}  errorProps Object containing additional properties to include in a returned error
 * @return {Promise<Array>}     Array with signature `[err, results]`
 */
function awaitHandler(promise, errorProps) {
    return promise.then(data => {
        return [null, data];
    }).catch(err => {
        if (errorProps)
            Object.assign(err, errorProps);
        return [err, null];
    });
}
exports.default = awaitHandler;
;
