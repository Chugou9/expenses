import * as React from 'react';
import {PublicUtilityPaymentsServices} from '../Services/PublicUtilityPaymentsServices';
import {PublicUtilityPaymentsForm} from '../Components/PublicUtilityPaymentsForm';
import { DEFAULT_PUBLIC_UTILITY_REQUEST } from '../Consts';
import { IPublicUtilityMonthPayments } from 'Models/PublicUtilityPayments';
import { PageOverlay } from 'Common/PageOverlay/PageOverlay';

const services = new PublicUtilityPaymentsServices();

/**
 * Модель собственных свойств компонента.
 */
interface IOwnProps {}

/**
 * Модель общего состояния для компонента.
 *
 * @prop {IPublicUtilityMonthPayments[]} [publicUtilityPayments] Данные о коммунальных платежах.
 * @prop {boolean} [isLoading] Идет ли загрузка в данный момент.
 */
interface IState {
    publicUtilityPayments?: IPublicUtilityMonthPayments[] | null;
    isLoading?: boolean;
}

/**
 * Страница, отображающая коммунальные платежи.
 */
export class PublicUtilityPaymentsPage extends React.PureComponent<IOwnProps, IState> {

    constructor(props: IOwnProps) {
        super(props);

        this.state = {publicUtilityPayments: null, isLoading: true}
    }

    componentDidMount() {
        services.getAllPublicUtilityPaymentsData(DEFAULT_PUBLIC_UTILITY_REQUEST).then(
            (data) => {
                this.setState({publicUtilityPayments: [...data], isLoading: false});
            },
            (error) => {
                this.setState({isLoading: false});

                throw new Error(error);
            }
        );
    }

    render() {
        const {publicUtilityPayments, isLoading} = this.state;

        return (
            <React.Fragment>
                <PageOverlay show={isLoading!}/>

                <PublicUtilityPaymentsForm
                    publicUtilityPayments={publicUtilityPayments!}
                    services={services}
                />
            </React.Fragment>
        );
    }
}
