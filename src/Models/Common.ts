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
 * @prop {number} [data] Показания счетчика.
 */
export interface IAbstractFuel extends IAbstractSum {
    data?: number;
}

/**
 * Абстрактная модель итоговой суммы.
 *
 * @prop {number} [actualSum] Фактическая сумма.
 * @prop {number} [countedSum] Примерная сумма.
 */
export interface IAbstractSum {
    actualSum?: number;
    countedSum?: number;
}

/**
 * Модель абстрактного варианта для выбора.
 *
 * @param {string} [title] Наименование.
 * @param {number} value Значение.
 * @param {string} [label] Лайбэл.
 */
export interface IAbstractOption {
    title?: string;
    value: number;
    label?: string;
}
