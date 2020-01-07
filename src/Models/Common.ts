/**
 * Обобщенная модель поля для отрисовки.
 *
 * @prop {string} [label] Наименование поля.
 * @prop {string} [placeholder] Подсказка.
 */
export interface IAbstractFieldToRender {
    label?: string;
    placeholder?: string;
}

/**
 * Модель абстрактная данных по одной единице используемого топлива.
 *
 * @prop {number} data Показания счетчика.
 */
export interface IAbstractFuel extends IAbstractSum {
    data: number;
}

/**
 * Абстрактная модель итоговой суммы.
 *
 * @prop {number} actualSum Фактическая сумма.
 * @prop {number} countedSum Примерная сумма.
 */
export interface IAbstractSum {
    actualSum: number;
    countedSum: number;
}
