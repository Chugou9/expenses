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
 *
 * @param {boolean} isMenuShown Флаг, который показывает, открыто ли меню.
 * @param {string} [menuClassname] Класс для управления отображением меню.
 */
interface IState {
    isMenuShown: boolean;
    menuClassname?: string;
}

/**
 * Компонент, возвращающий меню с роутером.
 */
export class Menu extends React.PureComponent<IOwnProps, IState> {

    constructor(props: IOwnProps) {
        super(props);

        this.state = {
            isMenuShown: false,
            menuClassname: 'hidden'
        };
    }

    /**
     * Обработчик открытия меню.
     */
    handleOpenMenu = () => {
        this.setState({
            isMenuShown: true
        }, () => setTimeout(
                () => this.setState({isMenuShown: false}),
                5000
            )
        );
    };

    render () {
        const {isMenuShown} = this.state;

        return (
            <div className="menu">
                <FontAwesomeIcon
                    className="menu-icon"
                    icon={faCompass}
                    onClick={this.handleOpenMenu}
                />

                {(
                    <Router>
                        <React.Fragment>
                            <NavLinks className={isMenuShown ? 'menu-expanding' : 'menu-collapsing'}/>

                            <RouterSwitch/>
                        </React.Fragment>
                    </Router>
                )}
            </div>
        );
    }
}
