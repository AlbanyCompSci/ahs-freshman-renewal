/* @flow */
'use strict';

/* Bootstrap CSS necessary to style the page
 * NOTE: it is used implicitly, so be cautious about removing the `require` */
require('bootstrap/less/bootstrap.less');

/* Required for JSX tranform */
import * as React from 'react';

/* React components with Bootstrap styling for building tabbed areas */
import {TabbedArea, TabPane} from 'react-bootstrap';

import type {Component} from './util/component';
import type {Either} from './util/either';
import {either, left, right} from './util/either';
import {Deferred} from './util/deferred';

/* The model for the tabbed area is product (type) of the current tab index
 * and the tab's model
 * NOTE: Unfortunately/fortunately, all tabs must have the same model type
 * as Flow does not support dependent types */
type Model<M> = {currTabIx: number; tabModels: Array<M>};

/* An action from a tab tagged with its index */
type TabAction<A> = {ix: number, action: A};

/* The action type of the tabbed area is either a new tab index
 * or a tab action */
type Action<A> = Either<TabAction<A>, number>

/* A tab consists of a title to be displayed on the selection tab, along with
 * the component to display in the body */
type Tab<M, A> = {title: string, component: Component<M, A>}

/* Create a component for a tabbed area given an array of tabs */
export function tabbed<M, A>(tabs: Array<Tab<M, A>>): Component<Model<M>, Action<A>> {

    /* The initial state of the tabbed area sets the current tab to the be the
     * first in the given list, and the list of states to be that of all the
     * given tabs' initial states. */
    const init = function() {
        const inits = tabs.map((t) => (t.component.init));
        return {currTabIx: 0, tabModels: inits};
    }();

    /* The update function takes an action to either change the area's current
     * tab or to update a tabs internal state */
    function update(a: Action<any>, m: Model<any>): Model<any> {
        /* Update the interal state of the tab at the specified index with
         * the provided action. */
        function updateTab({ix, act}: {ix: number, act: any}) {
            // TODO: use immutable data structures to avoid explicit copying
            const newTabModels = m.tabModels.slice();
            newTabModels[ix] = tabs[ix].component.update(act, m.tabModels[ix]);
            return {currTabIx: m.currTabIx, tabModels: newTabModels};
        }
        /* Change the current tab to the provided index. */
        function changeTab(n: number) {
            return {currTabIx: n, tabModels: m.tabModels};
        }
        /* Resolve the provided `Either` action by providing a function for
         * each possible side (right/left). */
        return either(a, updateTab, changeTab);
    }

    /* Render the tabs, showing the tab at the current index. */
    function render(m: Model<any>): {view: ReactElement; promise: Promise<Any>} {
        /* A `Deferred` for the value of an incoming tab selection. */
        const changeTab = new Deferred();
        /* A promise that will never return, to be used for tabs that are not
         * rendered (see below). */
        const emptyPromise = new Promise(function(resolve, reject) {});
        /* An array of tab panes with only the current one rendered, the others
         * being set to null, with empty promises. */
        const panes = tabs.map(
            function(tab: Tab<any, any>, ix: number): ReactElement {
                /* This optimization of only rendering the tab currently in
                 * should work well for most cases. The only forseeable issue
                 * is that if tabs have actions that don't depend on rendering
                 * to the screen. */
                const rendered = function() {
                    if (ix === m.currTabIx) {
                        return tab.component.render(m.tabModels[ix]);
                    } else {
                        return {view: null, promise: emptyPromise};
                    }
                }();
                /* The view for the current tab, enclosed in a `TabPane` for
                 * inclusion in a `TabbedArea` (see below). */
                const tabView = (
                    <TabPane key={ix} eventKey={ix} tab={tab.title}>
                        {rendered.view}
                    </TabPane>
                );
                /* The tab's promise takes the promise of the tab itself,
                 * and wraps it with the tab's index and then in a `left` to
                 * signal which part of the `Either` it is */
                const tabPromise = rendered.promise.then(function(action) {
                    return left({ix: ix, action: action});
                });
                return {view: tabView, promise: tabPromise};
            }
        );
        /* Take all of the rendered (or null) views from the tabs and put
         * them into a `TabArea` ReactElement with the current tab index set
         * as active (showing). Give it ability to resolve the changeTab
         * `Deferred` `Promise` as a callback for when a tab is selected. */
        const view = (
            <TabbedArea activeKey={m.currTabIx} onSelect={changeTab.resolve}>
                {panes.map((pane) => (pane.view))}
            </TabbedArea>
        );
        /* Wrap the changeTab `Promise` in a `right` to indicate which type
         * of action it is. */
        const changeTabPromise = changeTab.promise.then((ix) => right(ix));
        const allPromises = [changeTabPromise].concat(panes.map((p) => (p.promise)));
        /* Race all of the promises (select whichever action completes
         * (is triggered) first). */
        const promise = Promise.race(allPromises);
        return {view: view, promise: promise};
    }

    // The `Component` itself.
    return {init: init, update: update, render: render};
}
