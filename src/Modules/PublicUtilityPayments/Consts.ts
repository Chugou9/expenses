import {ITableColumnsConfig} from "../../Common/Table/Models";
import {IFormFieldsToRenderConfig} from 'Models/FormModels';
import {IPublicUtilityPaymentsFilter} from 'Models/PublicUtilityPayments';

/**
 * Конфигурация столбцов для коммуналки.
 */
export const PUBLIC_UTILITY_PAYMENTS_TABLE_COLUMNS: ITableColumnsConfig = {
    number: '№ п/п',
    month: 'Месяц',
    electricity: {
        title: 'Электричество',
        actualSum: 'Фактическая сумма',
        countedSum: 'Примерная сумма',
        data: 'Показания счетчика'
    },
    gas: {
        title: 'Газ',
        actualSum: 'Фактическая сумма',
        countedSum: 'Примерная сумма',
        data: 'Показания счетчика'
    },
    hus: 'ТСЖ', // housing and utility services
    rent: 'Арендная плата',
    sum: {
        title: 'Сумма',
        actualSum: 'Фактическая',
        countedSum: 'Примерная',
    }
};

/**
 * Поля для редактирования на форме коммунальных расходов.
 */
export const PublicUtilityPaymentsFormFields: IFormFieldsToRenderConfig = {
    month: {
        label: "Месяц"
    },
    electricity: {
        subheader: 'Электричество',
        actualSum: {
            label: 'Фактическая сумма',
            placeholder: 'Введите фактическую сумму'
        },
        data: {
            label: 'Показания счетчика',
            placeholder: 'Введите показания счетчика'
        }
    },
    gas: {
        subheader: 'Газ',
        actualSum: {
            label: 'Фактическая сумма',
            placeholder: 'Введите фактическую сумму'
        },
        data: {
            label: 'Показания счетчика',
            placeholder: 'Введите показания счетчика'
        }
    },
    hus: {
        label:'ТСЖ', // housing and utility services
        placeholder: 'Введите сумму'
    },
    rent: {
        label: 'Арендная плата',
        placeholder: 'Введите сумму арендной платы'
    }
};

/**
 * Запрос для фильтрации коммунальных платежей по умолчанию.
 */
export const DEFAULT_PUBLIC_UTILITY_REQUEST: IPublicUtilityPaymentsFilter = {
    year: new Date().getFullYear()
};