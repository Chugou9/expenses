import * as React from 'react';

/**
 * Модель собственных свойств компонента.
 *
 * @prop {string} label Кастомное наименование.
 * @prop {string} [labelClassName] Кастомный класс для наименования.
 * @prop {string} [elementClassName] Кастомный класс для блока с контентом.
 * @prop {string} [containerClassName] Класс для контейнера.
 */
interface IOwnProps {
    label: string;
    labelClassName?: string;
    elementClassName?: string;
    containerClassName?: string;
}

/**
 * Модель собственных свойств компонента.
 */
interface IState {}

/**
 * Компонент form-group.
 */
export class FormGroup extends React.PureComponent<IOwnProps, IState> {
    static defaultProps: Partial<IOwnProps> = {
        labelClassName: "",
        elementClassName: '',
        containerClassName: ''
    };

    render() {
        const {
            label,
            labelClassName,
            elementClassName,
            containerClassName
        } = this.props;

        return (
            <div className={`form-group ${containerClassName}`}>
                <label className={` ${labelClassName}`}>{label}</label>

                <div className={elementClassName}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}