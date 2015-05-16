/* @flow */
'use strict';

class Left<T> {
    val: T;
    constructor(v: T): void {
        this.val = v;
    }
}

class Right<T> {
    val: T;
    constructor(v: T): void {
        this.val = v;
    }
}

export type Either<A, B> = (Left | Right);

export function left<A, B>(v: A): Either<A, B> {
    return new Left(v);
}

export function right<A, B>(v: B): Either<A, B> {
    return new Right(v);
}

export function either<A, B, C>(x: Either<A, B>, f: (l: A) => C, g: (r: B) => C): C {
    return (x instanceof Left) ? f(x.val) : g(x.val);
}

export function mapLeft<A, B, C>(x: Either<A, B>, f: (l: A) => C): Either<C, B> {
    if (x instanceof Left) {
        return new Left(f(x.val));
    }
    return this;
}

export function mapRight<A, B, C>(x: Either<A, B>, f: (r: B) => C): Either<A, C> {
    if (x instanceof Right) {
        return new Right(f(x.val));
    }
    return this;
}
