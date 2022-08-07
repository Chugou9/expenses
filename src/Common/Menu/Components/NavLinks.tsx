import * as React from "react";
import {CONFIGURATION} from "../Config/Config";
import {Link} from "react-router-dom";
import { Icon } from "Common/BuildingBlocks/Icon";

/**
 * Модель собственных свойств компонента.
 *
 * @prop {string} [className] Кастомный класс.
 */
interface IOwnProps {
    className?: string;
}

/**
 * Модель состояния компонента.
 */
interface IState {}

/**
 * Компонент, отрисовывающий ссылки меню.
 */
export class NavLinks extends React.PureComponent<IOwnProps, IState> {

    render() {
        const {className} = this.props;

        return (
            <nav className={className}>
                <ul>
                    {CONFIGURATION.map((link) => (
                        <li key={link.path}>
                            <Link to={link.path}>
                                <Icon iconName={link.icon} />
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        );
    }
}
