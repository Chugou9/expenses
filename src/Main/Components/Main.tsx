import * as React from 'react';
import {Menu} from 'Common/Menu/Components/Menu';

/**
 * Модель собственных свойств компонента.
 */
interface IOwnProps {}

/**
 * Главный компонент приложения.
 */
export class Main extends React.PureComponent<IOwnProps, {}> {
    render() {
        return (
            <React.Fragment>
                <p>Главная страниц</p>
                <Menu />
            </React.Fragment>
        );
    }
}