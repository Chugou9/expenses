import * as React from 'react';

/**
 * Модель собственных свойств компонента.
 */
interface IOwnProps {}

/**
 * Страница, отображающая коммунальные платежи.
 */
export class PublicUtilityPaymentsPage extends React.PureComponent<IOwnProps, {}> {

    render() {
        return (
            <p>Страница с коммунальными платежами</p>
        );
    }
}
