/* @flow */
'use strict';

export type Pair<A, B> = {fstImpl: A, sndImpl: B};

export function fst<A, B>(p: Pair<A, B>): A {
    return p.fstImpl;
}

export function snd<A, B>(p: Pair<A, B>): B {
    return p.sndImpl;
}

export function pair<A, B>(a: A, b: B) {
    return {fstImpl: a, sndImpl: b};
}

export function mapFst<A, B, C>({fstImpl, sndImpl}: Pair<A, B>, f: (f: A) => C): Pair<C, B> {
    return pair(f(fstImpl), sndImpl);
}

export function mapSnd<A, B, C>({fstImpl, sndImpl}: Pair<A, B>, f: (s: B) => C): Pair<A, C> {
    return pair(fstImpl, f(sndImpl));
}
