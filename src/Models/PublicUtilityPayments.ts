/**
 * Модель данных коммунальных платежей за месяц.
 *
 * @prop {number} hus Услуги ТСЖ.
 */
export interface IPublicUtilityMonthPayments {
    month?: string;
    electrisity?: IAbstractFuel;
    gas?: IAbstractFuel;
    hus?: number;
    rent?: number;
    sum?: IAbstractSum;
}

/**
 * Модель абстрактная данных по одной единице используемого топлива.
 *
 * @prop {number} data Показания счетчика.
 */
interface IAbstractFuel extends IAbstractSum {
    data: number;
}

/**
 * Абстрактная модель итоговой суммы.
 *
 * @prop {number} actualSum Фактическая сумма.
 * @prop {number} countedSum Примерная сумма.
 */
interface IAbstractSum {
    actualSum: number;
    countedSum: number;
}