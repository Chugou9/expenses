import * as React from "react";
import {CONFIGURATION} from "../Config/Config";
import {Link} from "react-router-dom";

/**
 * Модель собственных свойств компонента.
 */
interface IOwnProps {}

/**
 * Модель состояния компонента.
 */
interface IState {}

/**
 * Компонент, отрисовывающий ссылки меню.
 */
export class NavLinks extends React.PureComponent<IOwnProps, IState> {

    render() {
        return (
            <nav>
                <ul>
                    {CONFIGURATION.map((link) => (
                        <li key={link.path}>
                            <Link to={link.path}>
                                {link.naming}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        );
    }
}