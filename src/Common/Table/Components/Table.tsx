import * as React from 'react';
import {ITableColumnsConfig} from '../Models';
import {TableHeader} from './TableHeader';

/**
 * Модель собственных свойств компонента.
 *
 * @prop {string} [wrapperClassName] Кастомный класс для обертки таблицы.
 * @prop {string} [tableClassName] Кастомный класс для таблицы.
 * @prop {ITableColumnsConfig} [tableColumnsConfig] Конфигурация столбцов таблицы.
 */
interface IOwnProps {
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
        const {tableColumnsConfig} = this.props;

        return (
            <div className={`wrapperClassName`}>
                <table className={`tableClassName`}>
                    {tableColumnsConfig && <TableHeader tableColumnsConfig={tableColumnsConfig} />}

                    <tbody>
                    </tbody>
                </table>
            </div>
        );
    }
}
