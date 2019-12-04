import * as React from 'react';
import {ITableColumnsConfig, ITableComplexColumn} from '../Models';

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
                if (typeof tableColumnsConfig[key] === 'string') {
                    result.push(<th>{tableColumnsConfig[key]}</th>);
                } else {
                    result.push(
                        this.renderComplexColumn(tableColumnsConfig[key] as ITableComplexColumn)
                    );
                }

            }
        }

        return result;
    };

    /**
     * Рисует заголовок тематической колонки.
     *
     * @param {ITableComplexColumn} params Параметры тематической колонки для отрисовки.
     */
    renderComplexColumn = ({title, actualSum, countedSum, data}: ITableComplexColumn): JSX.Element => {
        return (
            <th className="complex-column">
                <tr className="complex-column-title">
                    <th colSpan={3}>{title}</th>
                </tr>

                <tr className="complex-column-content">
                    <th>{actualSum}</th>
                    <th>{countedSum}</th>
                    {data &&<th>{data}</th>}
                </tr>
            </th>
        );
    }

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
