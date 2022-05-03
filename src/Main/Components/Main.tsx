import * as React from 'react';
import Menu from 'Common/Menu/Components/Menu';
import {WithoutMemo} from './Test';
import {WithMemo} from './WithMemo';

/**
 * Главный компонент приложения.
 */
function Main() {
    return (
        <>
            <Menu />
            <h1>Большая вкуснаz</h1>
            <div className="lists">
                <WithoutMemo />
                <WithMemo />

            </div>
        </>
    );
}

export default Main;
