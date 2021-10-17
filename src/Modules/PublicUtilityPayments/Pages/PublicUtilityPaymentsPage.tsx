import React, {useEffect} from 'react';
import {PublicUtilityPaymentsServices} from '../Services/PublicUtilityPaymentsServices';
import {PublicUtilityPaymentsForm} from '../Components/PublicUtilityPaymentsForm';
import { DEFAULT_PUBLIC_UTILITY_REQUEST } from '../Consts';
import { PageOverlay } from 'Common/PageOverlay/PageOverlay';
import {useQuery} from 'react-query';

const services = new PublicUtilityPaymentsServices();

/**
 * Страница, отображающая коммунальные платежи.
 */
export const PublicUtilityPaymentsPage: React.FunctionComponent = function() {
    const {isLoading, data:publicUtilityPayments, error, refetch} = useQuery('PublicUtilityPayments', () => services.getAllPublicUtilityPaymentsData(DEFAULT_PUBLIC_UTILITY_REQUEST));

    useEffect(function () {
        if (error) {
            throw new Error(error as string);
        }
    }, [error])

    return (
        <React.Fragment>
            <PageOverlay show={isLoading}/>

            <PublicUtilityPaymentsForm
                publicUtilityPayments={publicUtilityPayments!}
                services={services}
                onRefreshData={refetch}
            />
        </React.Fragment>
    );
}
