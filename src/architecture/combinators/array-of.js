/* @flow */
'use strict';

import * as R from 'ramda';

import type {Component} from '../component';

type Model<M> = Array<M>;

type Action<A> = {ix: number, action: A};

type Rendered<R> = Array<R>;

export function arrayOf<M, A, R>(components: Array<Component<M, A, R>>): Component<Model<M>, Action<A>, Rendered<R>> {

    const init = components.map((c) => c.init);

    function update({ix, action}: Action<any>, models: Model<any>): Model<any> {
        return R.update(ix, components[ix].update(act, models[ix]), models);
    }

    function render(models: Model<any>): {rendered: any; promise: Promise<any>} {
        const all = R.zipWith((c, m) => (c.render(m)), components, models);
        const allRendereds = R.map((x) => (x.rendered));
        const allPromises = R.map((x) => (x.promise));
        return {rendered: allRendereds, promise: Promise.race(allPromises)};
    }

    // The `Component` itself.
    return {init: init, update: update, render: render};
}
