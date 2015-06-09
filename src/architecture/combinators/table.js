/* @flow */

// Bootstrap styling
require('bootstrap/less/bootstrap.less');

// Required for JSX transform
var React = require('react');

import type * as ArrayOf from './array-of';
import {arrayOf} from './array-of';

export type Model<M> = ArrayOf.Model<ArrayOf.Model<M>>;
export type Action<A> = ArrayOf.Action<ArrayOf.Action<A>>;
export type Rendered = ReactElement;
type TableComponent<M, A> = Component<Model<M>, Action<A>, Rendered>;

type Matrix<T> = Array<Array<T>>;
type ComponentMatrix<M, A> = Matrix<Component<M, A, ReactElement>>;

function table<M, A>(headers: Array<string>, components: ComponentMatrix<M, A>): TableComponent<M, A> {
    const matrixComponent = arrayOf(components.map(arrayOf));

    const init = matrixComponent.init;

    const update = matrixComponent.update;

    function render(model: Model<any>): {view: Rendered, action: Promise<Action<any>>} {
        const {view, action} = matrixComponent.render(model);
        const headers = headers.map(function
        const rows = view.map(function(row) {
            return (<tr>{row.map((field) => (<td>{field}</td>))}</tr>);
        });
        return {view: (<Table>{[headers] + rows}</Table>), action: action};
    }
}
