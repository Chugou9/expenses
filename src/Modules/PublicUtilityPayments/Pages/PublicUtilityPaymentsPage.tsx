import * as React from 'react';
import {PublicUtilityPaymentsForm} from '../Components/PublicUtilityPaymentsForm';

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
            <PublicUtilityPaymentsForm />
        );
    }
}
