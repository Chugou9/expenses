import {ROUTES} from "../Consts";
import * as React from 'react';
import {ExpensesPage} from "Modules/Expenses/Pages/ExpensesPage";
import {PublicUtilityPaymentsPage} from 'Modules/PublicUtilityPayments/Pages/PublicUtilityPaymentsPage';
import {ChatPage} from 'Modules/Chat/Pages/ChatPage';
import {faWallet, faBolt, faCloud} from '@fortawesome/free-solid-svg-icons';

/**
 * Массив кофигурационных параметров по которым рисовать меню.
 */
export const CONFIGURATION = [
    {
        path: ROUTES.EXPENSES.PATH,
        exact: true,
        main: <ExpensesPage />,
        naming: ROUTES.EXPENSES.NAME,
        icon: faWallet
    },
    {
        path: ROUTES.PUBLIC_UTILITY_PAYMENTS.PATH,
        exact: true,
        main: <PublicUtilityPaymentsPage />,
        naming: ROUTES.PUBLIC_UTILITY_PAYMENTS.NAME,
        icon: faBolt
    },
    {
        path: ROUTES.CHAT.PATH,
        exact: true,
        main: <ChatPage />,
        naming: ROUTES.CHAT.NAME,
        icon: faCloud
    }
];
