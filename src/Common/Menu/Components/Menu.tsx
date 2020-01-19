import * as React from 'react';
import {BrowserRouter as Router, Redirect} from 'react-router-dom';
import {NavLinks} from './NavLinks';
import {RouterSwitch} from './RouterSwitch';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCompass} from '@fortawesome/free-solid-svg-icons';
import { ROUTES } from '../Consts';

/**
 * Модель собственных свойств компонента.
 */
interface IOwnProps {}

/**
 * Модель состояния компонента.
 *
 * @param {boolean} isMenuShown Флаг, который показывает, открыто ли меню.
 * @prop {boolean} firstLogIn Вход осуществлен первый раз.
 * @param {string} [menuClassname] Класс для управления отображением меню.
 */
interface IState {
    isMenuShown?: boolean;
    firstLogIn?: boolean;
    menuClassname?: string;
}

/**
 * Компонент, возвращающий меню с роутером.
 */
export class Menu extends React.PureComponent<IOwnProps, IState> {

    constructor(props: IOwnProps) {
        super(props);

        this.state = {
            firstLogIn: true,
            isMenuShown: false,
            menuClassname: 'hidden'
        };
    }

    componentDidMount() {
        this.setState({firstLogIn: false});
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
        const {isMenuShown, firstLogIn} = this.state;

        return (
            <div className="menu">
                <FontAwesomeIcon
                    className="menu-icon fa-sm"
                    icon={faCompass}
                    onClick={this.handleOpenMenu}
                />

                {(
                    <Router>
                        <React.Fragment>
                            {firstLogIn && <Redirect to={{pathname: ROUTES.PUBLIC_UTILITY_PAYMENTS.PATH}} />}
                            <NavLinks className={isMenuShown ? 'menu-expanding' : 'menu-collapsing'}/>

                            <RouterSwitch/>
                        </React.Fragment>
                    </Router>
                )}
            </div>
        );
    }
}
