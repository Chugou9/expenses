import * as React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {NavLinks} from './NavLinks';
import {RouterSwitch} from './RouterSwitch';
import '../../../Styles/Modules/Menu/Menu.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCompass} from '@fortawesome/free-solid-svg-icons'

/**
 * Модель собственных свойств компонента.
 */
interface IOwnProps {}

/**
 * Модель состояния компонента.
 */
interface IState {
    isMenuShown: boolean;
}

/**
 * Компонент, возвращающий меню с роутером.
 */
export class Menu extends React.PureComponent<IOwnProps, IState> {

    constructor(props: IOwnProps) {
        super(props);

        this.state = {
            isMenuShown: false
        };
    }

    /**
     * Обработчик открытия меню.
     */
    handleOpenMenu = () => {
        this.setState({isMenuShown: true});
    }

    render () {
        const {isMenuShown} = this.state;

        return (
            <div className="menu">
                <FontAwesomeIcon
                    className="menu-icon"
                    icon={faCompass}
                    onClick={this.handleOpenMenu}
                />

                {isMenuShown && (
                    <Router>
                        <React.Fragment>
                            <NavLinks />

                            <RouterSwitch/>
                        </React.Fragment>
                    </Router>
                )}
            </div>
        );
    }
}
