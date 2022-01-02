import {ROUTES} from "../Consts";
import * as React from 'react';
import {ExpensesPage} from "Modules/Expenses/Pages/ExpensesPage";
import {PublicUtilityPaymentsPage} from 'Modules/PublicUtilityPayments/Pages/PublicUtilityPaymentsPage';
import {faWallet, faBolt} from '@fortawesome/free-solid-svg-icons';

/**
 * Массив кофигурационных параметров по которым рисовать меню.
 */
export const CONFIGURATION = [
    {
        path: ROUTES.EXPENSES.PATH,
        main: <ExpensesPage />,
        naming: ROUTES.EXPENSES.NAME,
        icon: faWallet
    },
    {
        path: ROUTES.PUBLIC_UTILITY_PAYMENTS.PATH,
        main: <PublicUtilityPaymentsPage />,
        naming: ROUTES.PUBLIC_UTILITY_PAYMENTS.NAME,
        icon: faBolt
    },
];
