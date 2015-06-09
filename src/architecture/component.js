/* @flow */
'use strict';

/* This pattern is heavily inspired by the Elm Architecture
 * (https://github.com/evancz/elm-architecture-tutorial).
 * One significant difference is that we use Promises rather than
 * Signals/Observables, which limit components to producing one value per
 * update cycle. While this may be somewhat technically limiting, it does
 * allow us to reason about the model only in the context of what actions
 * are produced by the current states rendering, without having to worry
 * about values arising from previous renderings. */

/* Another related approach is the one employed in PureScript-Halogen
 * (https://github.com/slamdata/purescript-halogen), which takes a more
 * abstract approach and avoids the need to passing Addresses/Channels
 * for sending input
 */

/* The type of a component in the architecture */
export type Component<Model, Action, Rendered> = {
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
    render: (m: Model) => {view: Rendered; action: Promise<Action>}
};

/* Run the top-level component of an application, calling the onRender function
 * (e.g. (element) => React.render(element, document.body)) on the rendered
 * view each time before waiting on the promise to update and rerender the
 * component's state */
/* TODO: make sure runComponent operates with constant memory, since it will
 * run indefinitely will a potentially high frequency of updates, this is
 * critical */
export function runComponent<M, A, R>(component: Component<M, A, R>, onRender: (r: R) => void): void {
    /* Callback to log errors from the action `Promise`. */
    function onErr(err): void {
        console.log('Error stemming from a Promise: ' + err + '\n' + err.stack);
    }
    /* Render the given Model using the `onRender` function, then return a
     * Promise for a new Model updated with the action coming from `render`'s
     * Action Promise. */
    function render(model: any): Promise<any> {
        const {rendered, promise} = component.render(model);
        onRender(rendered);
        return promise.then((action) => (component.update(action, model)));
    }
    /* Indefinitely render the component's updated Model, starting with the
     * `init` Model, handling any errors with onErr */
    loop(component.init, render, onErr);
}

/* Indefinitely apply the function `iter` to the result of previous promise,
 * starting with `init`. Handle any errors with `onErr`, terminating the loop */
/* TODO: check that loop runs in constant space
 * http://stackoverflow.com/questions/29925948/building-a-promise-chain-recursively-in-javascript-memory-considerations */
function loop(init: T, iter: (x: T) => Promise<T>, onErr: (err: any) => void): void {
    iter(init).then((x) => (loop(x, iter, onErr)), onErr);
}
