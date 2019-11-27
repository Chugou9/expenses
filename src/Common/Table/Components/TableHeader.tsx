import * as React from 'react';
import {ITableColumnsConfig} from '../Models';

/**
 * Модель собственных свойств компонента.
 *
 * @prop {ITableColumnsConfig} tableColumnsConfig Конфигурация столбцов таблицы.
 */
interface IOwnProps {
    tableColumnsConfig: ITableColumnsConfig
}

/**
 * Модель состояния компонента.
 */
interface IState {}

/**
 * Компонент возвращающий заголовок таблицы.
 */
export class TableHeader extends React.PureComponent<IOwnProps, IState> {

    /**
     * Отрисовывает столбцы заголовка таблицы.
     */
    renderHeaderColumns = (): JSX.Element[] => {
        const {tableColumnsConfig} = this.props;
        const result = [];

        if (
            tableColumnsConfig &&
            Object.keys(tableColumnsConfig).length
        ) {


            for (let key in tableColumnsConfig) {
                result.push(<th>{tableColumnsConfig[key]}</th>);
            }
        }

        return result;
    };

    render() {
        return (
            <thead>
                <tr>
                    {this.renderHeaderColumns()}
                </tr>
            </thead>
        );
    }
}
