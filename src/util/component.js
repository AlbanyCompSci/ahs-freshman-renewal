/* @flow */
'use strict';

import * as React from 'react';

/* This pattern is heavily inspired by the Elm Architecture
 * (https://github.com/evancz/elm-architecture-tutorial).
 * One significant difference is that we use Promises rather than
 * Signals/Observables, which limit components to producing one value per
 * update cycle. While this may be somewhat technically limiting, it does
 * allow us to reason about the model only in the context of what actions
 * are produced by the current states rendering, without having to worry
 * about values arising from previous renderings. */

/* The type of a component in the architecture */
export type Component<Model, Action> = {
    /* The initial state of the component's state */
    init: Model;
    /* Update the component's current state model `m` with an incoming action
     * `a`, returning a new state model. Avoid side-effects including mutating
     * the original model */
    update: (a: Action, m: Model) => Model;
    /* Render the component's current state model `m`. A callback `cb` is
     * provided to pass back actions to the component's parent, which can
     * use them to update the component's state as well as use them itself.
     * Carefully document any interface that the actions provide to the parent,
     * and avoid exporting internal functionality on actions/models. */
    render: (m: Model) => {view: ReactElement; promise: Promise<Action>}
};

/* Run the top-level component of an application, rendering to the given
 * element in the DOM (e.g. document.body) */
export function runComponent<Model, Action>(component: Component<Model, Action>, container: HTMLElement): void {
    /* Callback to log errors from the action `Promise`. */
    function onReject(err): void {
        console.log('Error stemming from a Promise: ' + err);
    }
    /* Callback to update the given model with an incoming action, then render
     * the new model. Mutually recurses in an infinite loop with `go`. */
    function onFulfill(model): void {
        /* In order for the mutual recursion to work, we need to reference
         * go before it is defined, which conflicts with ESLint's rules, but
         * still produces valid JavaScript. */
        /* eslint-disable no-use-before-define */
        return (action) => go(component.update(action, model));
        /* eslint-enable no-use-before-define */
    }
    /* Render the given mode to the DOM, then add callbacks to the action
     * `Promise` to either update and rerender the model, or log any error.
     * Mutually recurses in an infinite loop with `onFulfill`. */
    function go(model): void {
        const {view, promise} = component.render(model);
        React.render(view, container);
        promise.then(onFulfill(model), onReject);
    }
    /* Start the cycle by rendering the component's initial state. */
    go(component.init);
}
