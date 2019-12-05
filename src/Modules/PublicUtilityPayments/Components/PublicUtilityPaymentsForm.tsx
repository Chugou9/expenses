import * as React from 'react';
import {Table} from 'Common/Table/Components/Table';
import {LayoutBlock} from 'Common/Layout/Components/LayoutBlock'
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
                <div className="row">
                    <LayoutBlock
                        className="col-xs-5 mr-2"
                    >
                        <div className="col-xs-6">
                            <div className="form-group">
                                <label className="control-label col-xs-2">Месяц</label>
                                <div className="col-xs-10">
                                    <input className="form-control"></input>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="control-label col-xs-2">Месяц</label>
                                <div className="col-xs-10">
                                    <input  className="form-control"></input>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="control-label col-xs-2">Месяц</label>
                                <div className="col-xs-10">
                                    <input type="select" className="form-control"></input>
                                </div>
                            </div>
                        </div>

                        <div className="col-xs-6">
                            <div className="form-group">
                                <label className="control-label col-xs-2">Месяц</label>
                                <div className="col-xs-10">
                                    <input type="select" className="form-control"></input>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="control-label col-xs-2">Месяц</label>
                                <div className="col-xs-10">
                                    <input type="select" className="form-control"></input>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="control-label col-xs-2">Месяц</label>
                                <div className="col-xs-10">
                                    <input type="select" className="form-control"></input>
                                </div>
                            </div>
                        </div>


                        <div className="form-group">
                            <label className="control-label col-xs-2">Месяц</label>
                            <div className="col-xs-10">
                                <input type="select"></input>
                            </div>
                        </div>
                    </LayoutBlock>

                    <LayoutBlock
                        className="col-xs-6"
                    >
                        Graph
                    </LayoutBlock>
                </div>

                <div className="row">
                    <LayoutBlock
                        className="col-xs-12"
                    >
                        <Table 
                            tableColumnsConfig={PUBLIC_UTILITY_PAYMENTS_TABLE_COLUMNS}
                        />
                    </LayoutBlock>
                </div>
            </div>
        );
    }
}