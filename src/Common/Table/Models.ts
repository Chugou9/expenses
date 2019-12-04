/**
 * Модель конфигурации столбцов таблицы.
 */
export interface ITableColumnsConfig {
    [key: string]: string | ITableComplexColumn;
}

/**
 * Модель сложного столбца заголовка.
 *
 * @prop {string} title Заголовок столбца.
 * @prop {string} actualSum Фактическая сумма.
 * @prop {string} countedSum Примерная сумма.
 * @prop {string} [data] Показания счетчика.
 */
export interface ITableComplexColumn {
    title: string;
    actualSum: string;
    countedSum: string;
    data?: string;
}
