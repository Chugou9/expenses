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
}
