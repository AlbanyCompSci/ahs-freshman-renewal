/* @flow */
'use strict';

/* A trivial component in the applications architecture implementing a counter
 * button. It is intended to show how components can be built as well as in
 * testing. */

/* Needed for JSX transform */
import * as React from 'react';

import {Deferred} from '../deferred';
import type {Component, Callback} from '../component';

type Action = void;
type Model = number;

function update(a: Action, m: Model): Model {
    return (m + 1);
}

function render(m: Model): {view: ReactElement; promise: Promise<Action>} {
    const deferred = new Deferred();
    console.log(JSON.stringify(deferred));
    const view = (
        <button onClick={() => (deferred.resolve(undefined))}>
            <h1>{String(m)}</h1>
        </button>
    );
    return {view: view, promise: deferred.promise};
}

export const counter: Component<Model, Action> = {
    init: 0,
    update: update,
    render: render
};
