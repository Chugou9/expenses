import { IAbstractFuel, IAbstractSum } from './Common';

/**
 * Модель данных коммунальных платежей за месяц.
 *
 * @prop {number} hus Услуги ТСЖ.
 */
export interface IPublicUtilityMonthPayments {
    month?: number;
    electricity?: IAbstractFuel;
    gas?: IAbstractFuel;
    hus?: number;
    rent?: number;
    sum?: IAbstractSum;
    year?: number;
    _id?: number | string;
    water?: IAbstractFuel;
}

/**
 * Модель запроса для фильтрования коммунальным платежей.
 *
 * @prop {number} year Год.
 * @prop {number} month Месяц.
 */
export interface IPublicUtilityPaymentsFilter {
    year?: number;
    month?: number;
}
