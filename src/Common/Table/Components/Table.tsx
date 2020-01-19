import * as React from 'react';
import {ITableColumnsConfig} from '../Models';
import {TableHeader} from './TableHeader';

/**
 * Модель собственных свойств компонента.
 *
 * @prop {any} data Любые данные.
 * @prop {Function} customRowsRender Кастомный художник строк.
 * @prop {string} [wrapperClassName] Кастомный класс для обертки таблицы.
 * @prop {string} [tableClassName] Кастомный класс для таблицы.
 * @prop {ITableColumnsConfig} [tableColumnsConfig] Конфигурация столбцов таблицы.
 */
interface IOwnProps {
    data: any;
    customRowsRender: (value: any) => JSX.Element[];
    wrapperClassName?: string;
    tableClassName?: string;
    tableColumnsConfig?: ITableColumnsConfig;
}

/**
 * Модель состояния компонента.
 */
interface IState {

}

/**
 * Компонент, который рисует таблицу.
 */
export class Table extends React.PureComponent<IOwnProps, IState> {

    render() {
        const {tableColumnsConfig, customRowsRender, data} = this.props;

        return (
            <div className={`wrapperClassName`}>
                <table className={`tableClassName`}>
                    {tableColumnsConfig && <TableHeader tableColumnsConfig={tableColumnsConfig} />}

                    <tbody>
                        {customRowsRender(data)}
                    </tbody>
                </table>
            </div>
        );
    }
}
