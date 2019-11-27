import * as React from 'react';

/**
 * Модель собственных свойств компонента.
 */
interface IOwnProps {}

/**
 * Модель состояния компонента.
 */
interface IState {}

/**
 * Форма с расходами.
 */
export class ExpensesForm extends React.PureComponent<IOwnProps, IState> {

    render() {
        return (
            <div className="form-horizontal">
                <div className="col-xs-6">
                    
                </div>

                <div className="col-xs-6">
                    Graph
                </div>
            </div>
        );
    }
}
