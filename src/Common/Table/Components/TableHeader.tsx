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
        const firstRow = this.renderFistHeaderRow(tableColumnsConfig);
        const secondRow = this.renderSecondHeaderRow(tableColumnsConfig);

        result.push(firstRow, secondRow);

        return result;
    };

    /**
     * Рисует первый уровень заголовка таблицы.
     *
     * @param {ITableColumnsConfig} tableColumnsConfig Конфигурация столбцов таблицы.
     */
    renderFistHeaderRow = (tableColumnsConfig: ITableColumnsConfig): JSX.Element => {
        const result: JSX.Element[] = [];

        if (
            tableColumnsConfig &&
            Object.keys(tableColumnsConfig).length
        ) {

            for (let key in tableColumnsConfig) {
                if (typeof tableColumnsConfig[key] === 'string') {
                    result.push(<th key={tableColumnsConfig[key] as string} rowSpan={2}>{tableColumnsConfig[key]}</th>);
                } else {
                    const {title, data} = tableColumnsConfig[key] as ITableComplexColumn;

                    result.push(<th key={title} scope="colgroup" colSpan={data ? 3 : 2}>{title}</th>);
                }
            }
        }

        return <tr>{result}</tr>;
    };

    /**
     * Рисует второй уровень заголовка таблицы.
     *
     * @param {ITableColumnsConfig} tableColumnsConfig Конфигурация столбцов таблицы.
     */
    renderSecondHeaderRow(tableColumnsConfig: ITableColumnsConfig) {
        const result: JSX.Element[] = [];

        if (
            tableColumnsConfig &&
            Object.keys(tableColumnsConfig).length
        ) {

            for (let key in tableColumnsConfig) {
                if (typeof tableColumnsConfig[key] !== 'string') {
                    const {title, data, countedSum, actualSum} = tableColumnsConfig[key] as ITableComplexColumn;

                    result.push(
                        <th key={`${title}_actualSum`}>{actualSum}</th>,
                        <th key={`${title}_countedSum`}>{countedSum}</th>,
                    );
                    data && result.push(<th key={`${title}_data`}>{data}</th>);
                }
            }
        }

        return <tr>{result}</tr>;
    };


    render() {
        //TODO: Доделать разбивку по колонкам
        return (
            <React.Fragment>
                {/* <col/>
                <col/>
                <colgroup span={3}></colgroup>
                <colgroup span={3}></colgroup>
                <col/>
                <col/>
                <colgroup span={2}></colgroup> */}
                <thead>
                    {this.renderHeaderColumns()}
                </thead>
            </React.Fragment>
        );
    }
}
