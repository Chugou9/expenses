import { IAbstractFuel, IAbstractSum } from './Common';

/**
 * Модель данных коммунальных платежей за месяц.
 *
 * @prop {number} hus Услуги ТСЖ.
 */
export interface IPublicUtilityMonthPayments {
    // month?: string;
    // electrisity?: IAbstractFuel;
    // gas?: IAbstractFuel;
    // hus?: number;
    // rent?: number;
    // sum?: IAbstractSum;
    [key: string]: string | IAbstractFuel | number | IAbstractSum;
}
