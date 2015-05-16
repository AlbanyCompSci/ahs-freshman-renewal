/* @flow */

import type {Callback} from '../component';

type FieldDef<T, BS> = {
    property: string;
    header: string;
    render: (value: T, binds: BS, validity: boolean, onChange: Callback<T>) => ReactElement<any, any, any>;
    validate: (value: T) => boolean;
    default: T;
    binds: (db: Database) => BS;
};
