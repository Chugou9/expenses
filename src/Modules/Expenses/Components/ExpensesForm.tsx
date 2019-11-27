import * as React from 'react';

/**
 * Модель собственных свойств компонента.
 */
interface IOwnProps {}

/**
 * Модель состояния компонента.
 */
interface IState {}

export class ExpensesForm extends React.PureComponent<IOwnProps, IState> {
    render() {
        return (
            <div>
                <div>
                    <table></table>
                </div>
            </div>
        );
    }
}
