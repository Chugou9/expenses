import * as React from 'react';

/**
 * Модель собственных свойств компонента.
 *
 * @prop {string} labelClassName Кастомный класс для наименования.
 * @prop {string} elementClassName Кастомный класс для блока с контентом.
 * @prop {string} label Кастомное наименование.
 */
interface IOwnProps {
    labelClassName: string;
    elementClassName: string;
    label: string;
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
        labelClassName: "col-xs-2",
        elementClassName: "col-xs-10"
    };

    render() {
        const {
            label,
            labelClassName,
            elementClassName
        } = this.props;

        return (
            <div className="form-group">
                <label className={`control-label ${labelClassName}`}>{label}</label>

                <div className={elementClassName}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}