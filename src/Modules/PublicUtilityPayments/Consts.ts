import {ITableColumnsConfig} from "../../Common/Table/Models";

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
