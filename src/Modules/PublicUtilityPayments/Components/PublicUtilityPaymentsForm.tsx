import * as React from 'react';
import {Table} from 'Common/Table/Components/Table';
import {PUBLIC_UTILITY_PAYMENTS_TABLE_COLUMNS} from '../Consts';

/**
 * Модель собственных свойств компонента.
 */
interface IOwnProps {}

/**
 * Модель состояния компонента.
 */
interface IState {}

/**
 * Форма с коммунальными платежами.
 */
export class PublicUtilityPaymentsForm extends React.PureComponent<IOwnProps, IState> {

    render() {
        return (
            <div className="form-horizontal">
                <div className="col-xs-6">
                    <Table 
                        tableColumnsConfig={PUBLIC_UTILITY_PAYMENTS_TABLE_COLUMNS}
                    />
                </div>

                <div className="col-xs-6">
                    Graph
                </div>
            </div>
        );
    }
}