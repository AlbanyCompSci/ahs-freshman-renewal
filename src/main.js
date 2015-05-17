/* @flow */
'use strict';

import * as React from 'react';

// import {PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY} from '../config';

import {runComponent} from './util/component';
// import {App} from './app';
import {counter} from './util/example/counter';
import {tabbed} from './tabbed';

function main() {
    document.title = 'AHS Freshman Debates';
    runComponent(
        // App(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY),
        // counter,
        tabbed([
            {title: '1', component: counter},
            {title: '2', component: counter}
        ]),
        (element) => React.render(element, document.body)
    );
}

main();
