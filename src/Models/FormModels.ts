import {IAbstractFieldToRender} from "./Common";

/**
 * Модель поля формы для отрисовки.
 *
 * @prop {string} [subheader] Подзаголовок.
 */
export interface IFormFieldToRender extends IAbstractFieldToRender {
    subheader?: string;
}

/**
 * Модель для комплексных полей формы.
 */
export interface IComplexFieldToRender {
    [key: string]: IFormFieldToRender | string;
}

/**
 * Модель конфигурации полей для отрисовки.
 */
export interface IFormFieldsToRenderConfig {
    [key: string]: IComplexFieldToRender;
}
