import {ROUTES} from "../Consts";
import * as React from 'react';
import {ExpensesPage} from "../../../Modules/Expenses/Pages/ExpensesPage";
import {PublicUtilityPaymentsPage} from 'Modules/PublicUtilityPayments/Pages/PublicUtilityPaymentsPage'

/**
 * Массив кофигурационных параметров по которым рисовать меню.
 */
export const CONFIGURATION = [
    {
        path: ROUTES.EXPENSES.PATH,
        exact: true,
        main: <ExpensesPage />,
        naming: ROUTES.EXPENSES.NAME
    },
    {
        path: ROUTES.PUBLIC_UTILITY_PAYMENTS.PATH,
        exact: true,
        main: <PublicUtilityPaymentsPage />,
        naming: ROUTES.PUBLIC_UTILITY_PAYMENTS.NAME
    }
];
