import * as React from 'react';
import { CustomSpinner } from '../BuildingBlocks/FormGroup/Spinner';

/**
 * Модель собственных свойств компонента.
 *
 * @prop {boolean} show Флаг, который показывает, нужно ли отображать компонент.
 */
interface IOwnProps {
    show: boolean;
}

interface IState {}


/**
 * Компонент перекрывающий страницу.
 */
export class PageOverlay extends React.PureComponent<IOwnProps, IState> {
    render() {
        const {show} = this.props;

        return (
            !!show && (
                <div className="page-overlay">
                    <CustomSpinner show/>
                </div>
            )
        );
    }
}
