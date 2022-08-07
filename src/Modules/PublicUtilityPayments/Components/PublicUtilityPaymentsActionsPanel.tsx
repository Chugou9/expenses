import { PublicUtilityPaymentsActionsProvider } from "../Actions/PublicUtilityPaymentsActionProvider";
import * as React from 'react';
import {PublicUtilityPaymentsServices} from '../Services/PublicUtilityPaymentsServices';
import {IPublicUtilityMonthPayments} from '../../../Models/PublicUtilityPayments';
import { Icon } from "Common/BuildingBlocks/Icon";


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
            <Icon iconName={action.icon} />
        </button>
    ));

    return (
        <div className="text-right no-wrap">
            {buttons}
        </div>
    );
}