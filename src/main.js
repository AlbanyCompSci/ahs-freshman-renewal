/* @flow */
'use strict';

// import {App} from './app';
import {runComponent} from './util/component';
// import {PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY} from '../config';

import {counter} from './util/example/counter';
import {tabbed} from './tabbed';

function main() {
    document.title = 'AHS Freshman Debates';
    runComponent(
        // App(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY),
        tabbed([
            {title: '1', component: counter},
            {title: '2', component: counter}
        ]),
        document.body
    );
}

main();
