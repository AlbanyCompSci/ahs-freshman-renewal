/* @flow */
import type {Component, Callback} from './component'
import {Tabbed} from './tabbed'
import type * as Tab from './tabs/types'

import Home from './tabs/home';
import Debates from './tabs/debates';
//import Teams from './tabs/teams';
//import Debaters from './tabs/debaters';
//import Judges from './tabs/judges';
//import Teachers from './tabs/teachers';
//import JudgeDebate from './tabs/judge-debate';

type ParseCredentials = {applicationId: string; javascriptKey: string};

const TABS: Array<Component<mixed, mixed>> = [Home, Debates];

// TODO
type Model = any;
type Action = any;

export function App(cred: ParseCredentials): Component<Model, Action> {
    const tabbedComponent = Tabbed(TABS);
    function init(): Model {
        return undefined;
    }
    function update(a: Action, m: Model): Model {
        return undefined;
    }
    function render(m: Model, cb: Callback<Action>): void {
        return undefined;
    }
    return {init: init, update: update, render: render}
}
