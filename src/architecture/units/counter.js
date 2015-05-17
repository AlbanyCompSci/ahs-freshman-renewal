/* @flow */
'use strict';

/* A trivial component in the applications architecture implementing a counter
 * button. It is intended to show how components can be built as well as in
 * testing. */

/* Needed for JSX transform */
import * as React from 'react';

import {Deferred} from '../../util/deferred';
import type {Component} from '../component';

export type Action = void;
export type Model = number;
export type Rendered = ReactElement;

function update(a: Action, m: Model): Model {
    return (m + 1);
}

function render(m: Model): {view: ReactElement; promise: Promise<Action>} {
    const deferred = new Deferred();
    const view = (
        <button onClick={() => (deferred.resolve(undefined))}>
            <h1>{String(m)}</h1>
        </button>
    );
    return {rendered: rendered, promise: deferred.promise};
}

export const counter: Component<Model, Action, Rendered> = {
    init: 0,
    update: update,
    render: render
};
