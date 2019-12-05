import * as React from 'react';

/**
 * Модель собственных свойств компонента.
 *
 * @prop {string} [className] Кастомный класс для блока разметки.
 */
interface IOwnProps {
    className?: string;
}

/**
 * Модель состояния компонента.
 */
interface IState {

}

/**
 * Компонент, содержащий основной контент.
 */
export class LayoutBlock extends React.PureComponent<IOwnProps, IState> {
    render() {
        const {className} = this.props;

        return (
            <div className={`layout-block ${className ? className : ''}`}>
                {this.props.children}
            </div>
        );
    }
}