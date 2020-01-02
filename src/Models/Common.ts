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
