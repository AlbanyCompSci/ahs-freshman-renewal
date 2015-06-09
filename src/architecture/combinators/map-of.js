/* @flow */
'use strict';

import * as R from 'ramda';

type Map<K, V> = {[key: K]: V}

export type Model<K, M> = Map<K, M>
export type Action<K, A> = {key: K, action: A}
export type Rendered<K, R> = Map<K, R>

export function mapOf<K, M, A, R>(components: Map<K, Component<M, A, R>>): Component<Model<K, M>, Action<K, A>, Rendered<K, R>> {

    const init: Model<any, any> = R.mapObj((k, v) => (v.init), components);

    function update({key, action}: Action<any, any>, model: Model<any, any>): Model<any, any> {
        const newModel = R.clone(model);
        newModel[key] = components[key].update(action, model[key]);
        return newModel;
    }

    function render(model: Model<any, any>): {rendered: Rendered, promise: Promise<any>} {
        rendereds = {};
        promises = [];
        for (var key in components) {
            {rendered, promise} = components[key].render(model[key]);
            rendereds[key] = rendered;
            promises.push(promise);
        }
        return {rendered: rendereds, promise: Promise.race(promises)}
    }
}
