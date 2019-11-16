import * as React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {NavLinks} from './NavLinks';
import {RouterSwitch} from './RouterSwitch';

/**
 * Модель собственных свойств компонента.
 */
interface IOwnProps {}

/**
 * Компонент, возвращающий меню с роутером.
 */
export class Menu extends React.PureComponent<IOwnProps, {}> {

    render () {
        return (
            <div className="menu">
                <Router>
                    <React.Fragment>
                        <NavLinks />
                        <RouterSwitch/>
                    </React.Fragment>
                </Router>
            </div>
        );
    }
}