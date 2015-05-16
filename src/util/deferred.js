/* @flow */
'use strict';

// Callbacks take a value and do not return anything.
export type Callback<T> = (value: T) => void;

// Promises allow any type as an error.
type Err = any;

/* NOTE: This interface was once included in some ES6 Promise implementations
 * but was later deprecated, however it is/seems necessary to build Promises
 * from callback-based asynchrony (see below).
 * A deferred value that allows values to be sent to it unlike an ES6
 * Promise. This is useful for turning callback-based asynchronous functions
 * into ones returning a Promise:
 * function readWithCallback(file: string, cb: (s: string) => void): void { ... }
 * function promiseRead(file: string): Promise<string> {
 *    const deferred = new Deferred();
 *    readWithCallback(file, deferred.resolve);
 *    return deferred.promise;
 * }
 * This implementation is based on the one suggested at
 * https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Deferred.
 */
export class Deferred<R> {
    /* The promise holding the value sent by resolve/reject. */
    promise: Promise<R>;
    /* Send a value to the Promise. */
    resolve: Callback<R>;
    /* Send an error to the Promise. */
    reject: Callback<Err>;
    constructor(): void {
        this.promise = new Promise(function(resolve, reject) {
            this.resolve = resolve;
            this.reject = reject;
        }.bind(this));
        Object.freeze(this);
    }
}
