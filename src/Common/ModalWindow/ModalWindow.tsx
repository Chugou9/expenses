import * as React from 'react';
import {LayoutBlock} from '../Layout/Components/LayoutBlock';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

/**
 * Модель собственных свойств компонента.
 *
 * @prop {JSX.Element} body Тело модального окна.
 * @prop {JSX.Element} title Заголовок модального окна.
 * @prop {JSX.Element} [footer] Заголовок модального окна.
 * @prop {string} [className] Кастомный класс для компонента модального окна.
 * @prop {Function} [onClose] Колбэк на закрытие модального окна.
 */
interface IOwnProps {
    body: JSX.Element;
    title: JSX.Element;
    footer?: JSX.Element;
    className?: string;
    onClose?: () => void;
}

/**
 * Модель состояния компонента.
 */
interface IState {}


/**
 * Компонент модального окна.
 */
export class ModalWindow extends React.PureComponent<IOwnProps, IState> {

    render() {
        const {
            className,
            title,
            body,
            footer,
            onClose} = this.props;

        return (
            <LayoutBlock className={`modal-window ${className ? className : ''}`}>
                <div className="modal-window-title-container">
                    <div className="modal-window-title">
                        {title}
                    </div>
                   

                    <div className="modal-window-action-container text-right">
                        <button
                            className="btn icon-btn close-button"
                            title="Закрыть"
                            onClick={onClose}
                        >
                            <FontAwesomeIcon icon={faTimes} className="fa-lg" />
                        </button>
                    </div>
                </div>

                <div className="modal-window-body">
                    {body}
                </div>

                <div className="modal-window-footer">
                    {footer}
                </div>
            </LayoutBlock>
        );
    }
}
