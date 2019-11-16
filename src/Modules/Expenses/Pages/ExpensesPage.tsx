import * as React from "react";

/**
 * Модель собственных свойств компонента.
 */
interface IOwnProps {}

/**
 * Страница для отобразения комуналки.
 */
export class ExpensesPage extends React.PureComponent<IOwnProps, {}> {
    render() {
        return (
            <div>Страница с расходами</div>
        );
    }
}