import {ROUTES} from "../Consts";
import * as React from 'react';
import {ExpensesPage} from "Modules/Expenses/Pages/ExpensesPage";
import {PublicUtilityPaymentsPage} from 'Modules/PublicUtilityPayments/Pages/PublicUtilityPaymentsPage';
import { EIcons } from "Enums";

/**
 * Массив кофигурационных параметров по которым рисовать меню.
 */
export const CONFIGURATION = [
    {
        path: ROUTES.EXPENSES.PATH,
        main: <ExpensesPage />,
        naming: ROUTES.EXPENSES.NAME,
        icon: EIcons.WALLET_ICON,
    },
    {
        path: ROUTES.PUBLIC_UTILITY_PAYMENTS.PATH,
        main: <PublicUtilityPaymentsPage />,
        naming: ROUTES.PUBLIC_UTILITY_PAYMENTS.NAME,
        icon: EIcons.BILL_ICON,
    },
];
