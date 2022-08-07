import {ITableColumnsConfig} from "../../Common/Table/Models";
import {IFormFieldsToRenderConfig} from 'Models/FormModels';
import {IPublicUtilityPaymentsFilter} from 'Models/PublicUtilityPayments';
import { EIcons } from "Enums";

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
        data: 'Показания счетчика',
        icon: EIcons.BULB_ICON
    },
    gas: {
        title: 'Газ',
        actualSum: 'Фактическая сумма',
        countedSum: 'Примерная сумма',
        data: 'Показания счетчика',
        icon: EIcons.FIRE_ICON
    },
    water: {
        title: 'Вода',
        actualSum: 'Фактическая сумма',
        countedSum: 'Примерная сумма',
        data: 'Показания счетчика',
        icon: EIcons.WATER_VALVE_ICON,
    },
    hus: 'ТСЖ', // housing and utility services
    rent: 'Арендная плата',
    sum: {
        title: 'Сумма',
        actualSum: 'Фактическая',
        actualSumIcon: EIcons.SUM_ICON,
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
    hus: {
        label:'ТСЖ', // housing and utility services
        placeholder: 'Введите сумму'
    },
    rent: {
        label: 'Арендная плата',
        placeholder: 'Введите сумму арендной платы'
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
    water: {
        subheader: 'Вода',
        actualSum: {
            label: 'Фактическая сумма',
            placeholder: 'Введите фактическую сумму'
        },
        data: {
            label: 'Показания счетчика',
            placeholder: 'Введите показания счетчика'
        }
    },
};

/**
 * Запрос для фильтрации коммунальных платежей по умолчанию.
 */
export const DEFAULT_PUBLIC_UTILITY_REQUEST: IPublicUtilityPaymentsFilter = {
    year: new Date().getFullYear()
};