import { PublicUtilityPaymentsActionsProvider } from "../Actions/PublicUtilityPaymentsActionProvider";
import * as React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {PublicUtilityPaymentsServices} from '../Services/PublicUtilityPaymentsServices';
import {IPublicUtilityMonthPayments} from '../../../Models/PublicUtilityPayments';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';


/**
 * Модель параметров экшн-панели.
 *
 * @param {IPublicUtilityMonthPayments} selectedItem Выбранный месяц коммунальных платежей.
 */
export interface IPublicUtilityPaymentsActionPanelParams {
    selectedItem: IPublicUtilityMonthPayments;
    onEdit: (selectedItem: IPublicUtilityMonthPayments) => void;
    services: PublicUtilityPaymentsServices;
}

export const PublicUtilityPaymentsActionPanel: React.SFC<IPublicUtilityPaymentsActionPanelParams> = (
    params: IPublicUtilityPaymentsActionPanelParams
) => {
    const actionsProvider = PublicUtilityPaymentsActionsProvider(params);
    const {EDIT, DELETE} = actionsProvider;

    let buttons = [EDIT,DELETE].map((action) => (
        <button
            key={action.key}
            title={action.title}
            onClick={action.action}
            className={`btn icon-btn ${action.className}`}
        >
            <FontAwesomeIcon icon={action.icon as IconDefinition} />
        </button>
    ));

    return (
        <div className="text-right no-wrap">
            {buttons}
        </div>
    );
}