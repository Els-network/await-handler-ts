"use strict";
/**
 * Handler which takes a promise and resolves with array signature `[err, results]`.
 * @generics <errorType, dataType> Type of the error and data
 * @param  {Promise} promise    Promise to handle
 * @param  {Object}  errorProps Object containing additional properties to include in a returned error
 * @return {Promise<Array>}     Array with signature `[err, results]`
 */
export default function awaitHandler<ErrorProps extends Object | null, Data>(promise: Promise<Data>, errorProps?: ErrorProps): Promise<[error: ErrorProps | null, data: Data | null]> {
    return promise.then<[error: ErrorProps | null, data: Data |null]>(data => {
        return [null, data];
    }).catch(err => {
        if(errorProps) Object.assign(err, errorProps);
        return [err, null];
    });
};
