/* @flow */
'use strict';

/* Bootstrap CSS necessary to style the page
 * NOTE: it is used implicitly, so be cautious about removing the `require` */
require('bootstrap/less/bootstrap.less');

/* Required for JSX tranform */
import * as React from 'react';

/* React components with Bootstrap styling for building tabbed areas */
import {TabbedArea, TabPane} from 'react-bootstrap';

import type {Component} from '../component';
import type {Either} from '../../util/either';
import {either, left, right} from '../../util/either';
import {Deferred} from '../../util/deferred';

/* The model for the tabbed area is product (type) of the current tab index
 * and the tab's model
 * NOTE: Unfortunately/fortunately, all tabs must have the same model type
 * as Flow does not support dependent types */
type Model<M> = {currTabIx: number; tabModels: Array<M>};

/* A tab action tagged with the tab's index */
type TabAction<A> = {ix: number, action: A}

/* The action type of the tabbed area is either a new tab index
 * or a tab action */
type Action<A> = Either<TabAction<A>, number>

/* A tab consists of a title to be displayed on the selection tab, along with
 * the component to display in the body */
type Tab<M, A> = {title: string, component: Component<M, A, ReactElement>}

type Rendered = ReactElement;

/* Create a component for a tabbed area given an array of tabs */
export function tabbed<M, A>(tabs: Array<Tab<M, A>>): Component<Model<M>, Action<A>, Rendered> {

    /* The initial component state focuses on the first tab with the models
     * of all tabs set to be their initial state's */
    const init = {
        currTabIx: 0,
        tabModels: tabs.map((t) => (t.component.init))
    };

    /* The update function takes an action to either change the area's current
     * tab or to update a tabs internal state */
    function update(a: Action<any>, m: Model<any>): Model<any> {
        /* Change the current tab to the provided index. */
        function changeTab(n: number): Model<any> {
            return {currTabIx: n, tabModels: m.tabModels};
        }
        function tabsUpdate({ix, action} : TabAction<any>): Model<any> {
            const newTabModels = m.tabModels.slice(); // copy tabModels
            newTabModels[ix] = tabs[ix].component.update(action, m.tabModels[ix]);
            return {
                currTabIx: m.currTabIx,
                tabModels: newTabModels
            };
        }
        /* Resolve the provided `Either` action by providing a function for
         * each possible side (right/left). */
        return either(a, tabsUpdate, changeTab);
    }

    /* Render the tabs, showing the tab at the current index. */
    function render(m: Model<any>): {rendered: ReactElement; promise: Promise<Any>} {
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
                const {rendered, promise} = function() {
                    if (ix === m.currTabIx) {
                        return tab.component.render(m.tabModels[ix]);
                    } else {
                        return {rendered: null, promise: emptyPromise};
                    }
                }();
                /* The view for the current tab, enclosed in a `TabPane` for
                 * inclusion in a `TabbedArea` (see below). */
                const tabRendered = (
                    <TabPane key={ix} eventKey={ix} tab={tab.title}>
                        {rendered}
                    </TabPane>
                );
                /* The tab's promise takes the promise of the tab itself,
                 * and wraps it with the tab's index and then in a `left` to
                 * signal which part of the `Either` it is */
                const tabPromise = promise.then(function(action) {
                    return left({ix: ix, action: action});
                });
                return {rendered: tabRendered, promise: tabPromise};
            }
        );
        /* Take all of the rendered (or null) views from the tabs and put
         * them into a `TabArea` ReactElement with the current tab index set
         * as active (showing). Give it ability to resolve the changeTab
         * `Deferred` `Promise` as a callback for when a tab is selected. */
        const renderedAll = (
            <TabbedArea activeKey={m.currTabIx} onSelect={changeTab.resolve}>
                {panes.map((pane) => (pane.rendered))}
            </TabbedArea>
        );
        /* Wrap the changeTab `Promise` in a `right` to indicate which type
         * of action it is. */
        const changeTabPromise = changeTab.promise.then((ix) => right(ix));
        const allPromises = [changeTabPromise].concat(panes.map((p) => (p.promise)));
        /* Race all of the promises (select whichever action completes
         * (is triggered) first). */
        const promiseAll = Promise.race(allPromises);
        return {rendered: renderedAll, promise: promiseAll};
    }

    // The `Component` itself.
    return {init: init, update: update, render: render};
}
